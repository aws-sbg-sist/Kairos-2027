import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { resolveAuthContext, hasPermission } from '@/lib/rbac';
import { 
  sendTransactionalEmail, 
  buildRegistrationConfirmationEmail,
  buildEmailVerificationEmail,
  buildPasswordResetEmail,
  buildTeamCreationEmail,
  buildTeamInvitationEmail,
  buildTeamJoiningConfirmationEmail,
  buildAbstractReviewEmail,
  buildQualifierSubmissionEmail,
  buildEventAnnouncementEmail, 
  buildCheckinConfirmationEmail,
  wrapKairosEmail,
  generateIdempotencyKey 
} from '@/lib/email';
import { EmailPayload, NotificationLog } from '@/types';

export async function GET(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'notifications:read')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to view notification telemetry.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const statusFilter = searchParams.get('status')?.toUpperCase();
    const templateFilter = searchParams.get('template');
    const search = searchParams.get('search')?.toLowerCase();

    let logs = await db.getNotificationLogs(Math.min(limit, 200));

    if (statusFilter && statusFilter !== 'ALL') {
      logs = logs.filter(l => l.status === statusFilter);
    }

    if (templateFilter && templateFilter !== 'ALL') {
      logs = logs.filter(l => l.template === templateFilter);
    }

    if (search) {
      logs = logs.filter(l => 
        l.to.toLowerCase().includes(search) || 
        l.subject.toLowerCase().includes(search) ||
        (l.messageId && l.messageId.toLowerCase().includes(search))
      );
    }

    const stats = {
      total: logs.length,
      sent: logs.filter(l => l.status === 'DELIVERED' || l.status === 'SIMULATED').length,
      failed: logs.filter(l => l.status === 'FAILED').length,
      suppressed: logs.filter(l => l.status === 'SUPPRESSED_DUPLICATE').length,
    };

    return NextResponse.json({
      success: true,
      count: logs.length,
      stats,
      logs
    });
  } catch (err: any) {
    console.error('[API Admin Notifications GET Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authCtx = await resolveAuthContext();
    if (authCtx.role === 'ANONYMOUS') {
      return NextResponse.json({ success: false, error: 'Unauthorized: Admin session required' }, { status: 401 });
    }

    if (!hasPermission(authCtx.role, 'notifications:broadcast')) {
      return NextResponse.json({
        success: false,
        error: 'Forbidden: Insufficient privileges to broadcast notifications.',
        code: 'FORBIDDEN'
      }, { status: 403 });
    }

    const body = await req.json();
    const { type = 'announcement' } = body;

    // Template Render / Inspection
    if (type === 'preview' || type === 'template-render') {
      const { templateName, data } = body;
      let payload: EmailPayload | null = null;
      switch (templateName) {
        case 'registration-confirmation':
          payload = buildRegistrationConfirmationEmail(data);
          break;
        case 'email-verification':
          payload = buildEmailVerificationEmail(data);
          break;
        case 'password-reset':
          payload = buildPasswordResetEmail(data);
          break;
        case 'team-creation':
          payload = buildTeamCreationEmail(data);
          break;
        case 'team-invitation':
          payload = buildTeamInvitationEmail(data);
          break;
        case 'team-joining-confirmation':
          payload = buildTeamJoiningConfirmationEmail(data);
          break;
        case 'abstract-review':
          payload = buildAbstractReviewEmail(data);
          break;
        case 'qualifier-submission':
          payload = buildQualifierSubmissionEmail(data);
          break;
        case 'event-announcement':
          payload = buildEventAnnouncementEmail(data);
          break;
        case 'checkin-confirmation':
          payload = buildCheckinConfirmationEmail(data);
          break;
        default:
          return NextResponse.json({ success: false, error: `Unknown template: ${templateName}` }, { status: 400 });
      }
      return NextResponse.json({ success: true, payload });
    }

    // Direct / Test Notification Dispatch
    if (type === 'direct' || type === 'test') {
      const { to, subject, html, text, template = 'CUSTOM_ADMIN_MESSAGE' } = body;
      if (!to || !subject) {
        return NextResponse.json({
          success: false,
          error: 'Recipient email ("to") and "subject" are required for direct notification.',
          code: 'BAD_REQUEST'
        }, { status: 400 });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(to.trim())) {
        return NextResponse.json({
          success: false,
          error: 'Invalid recipient email address format.',
          code: 'INVALID_EMAIL'
        }, { status: 400 });
      }

      const finalHtml = html || wrapKairosEmail(
        `<h2 style="color: #ffffff; margin-top: 0;">${subject}</h2><p style="color: #cbd5e1; font-size: 15px; line-height: 1.6;">${text || 'This is an official administrative test notification from the KAIROS 2027 operations team.'}</p>`,
        'Official Event Dispatch'
      );

      const result = await sendTransactionalEmail({
        to: to.trim().toLowerCase(),
        subject,
        html: finalHtml,
        text: text || subject,
        template,
        idempotencyKey: body.idempotencyKey
      });

      return NextResponse.json({
        success: result.success,
        deliveryStatus: result.suppressed ? 'SUPPRESSED_DUPLICATE' : (result.simulated ? 'SIMULATED' : (result.success ? 'DELIVERED' : 'FAILED')),
        messageId: result.messageId,
        error: result.error
      }, { status: result.success ? 200 : 400 });
    }

    // Official Announcement Broadcast
    if (type === 'announcement') {
      const { 
        title, 
        summary, 
        category = 'SCHEDULE', 
        urgency = 'INFO', 
        actionUrl, 
        actionLabel,
        targetTrack = 'ALL' 
      } = body;

      if (!title || !summary) {
        return NextResponse.json({
          success: false,
          error: 'Announcement "title" and "summary" are required for broadcast.',
          code: 'BAD_REQUEST'
        }, { status: 400 });
      }

      let teams = await db.getTeams();
      if (targetTrack !== 'ALL') {
        const cleanTrack = targetTrack.toLowerCase().replace(/^track-/, '');
        teams = teams.filter(t => t.trackId.toLowerCase().replace(/^track-/, '') === cleanTrack);
      }

      // Collect unique recipient builders
      const recipientMap = new Map<string, { name: string; email: string }>();

      for (const t of teams) {
        if (t.leaderEmail) {
          recipientMap.set(t.leaderEmail.toLowerCase(), {
            name: t.leaderName || 'Builder',
            email: t.leaderEmail.toLowerCase()
          });
        }
        for (const m of (t.members || [])) {
          if (m.email && !recipientMap.has(m.email.toLowerCase())) {
            recipientMap.set(m.email.toLowerCase(), {
              name: m.name || 'Builder',
              email: m.email.toLowerCase()
            });
          }
        }
      }

      const recipients = Array.from(recipientMap.values());
      if (recipients.length === 0) {
        return NextResponse.json({
          success: true,
          message: 'No builders found matching the selected track criteria.',
          dispatchedCount: 0,
          stats: { total: 0, sent: 0, suppressed: 0, failed: 0 }
        });
      }

      // Dispatch announcement in batches of 10 concurrently
      let sentCount = 0;
      let suppressedCount = 0;
      let failedCount = 0;

      const batchSize = 10;
      for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);
        await Promise.all(batch.map(async (recipient) => {
          const emailPayload = buildEventAnnouncementEmail({
            to: recipient.email,
            recipientName: recipient.name,
            title,
            summary,
            category,
            urgency: urgency as any,
            actionUrl,
            actionLabel,
          });

          const result = await sendTransactionalEmail(emailPayload);
          if (result.suppressed) {
            suppressedCount++;
          } else if (result.success) {
            sentCount++;
          } else {
            failedCount++;
          }
        }));
      }

      // Audit log the broadcast
      await db.addAuditLog(
        authCtx.adminSession?.organizerName || 'Admin Organizer',
        'BROADCAST_ANNOUNCEMENT',
        `Broadcast "${title}" (${category}, ${urgency}) to ${sentCount}/${recipients.length} builders across track ${targetTrack}`
      );

      return NextResponse.json({
        success: true,
        message: `Broadcast completed to ${sentCount} recipient(s).`,
        stats: {
          total: recipients.length,
          sent: sentCount,
          suppressed: suppressedCount,
          failed: failedCount
        }
      });
    }

    return NextResponse.json({
      success: false,
      error: `Unsupported notification dispatch type "${type}". Allowed: "announcement", "direct", "test".`,
      code: 'BAD_REQUEST'
    }, { status: 400 });
  } catch (err: any) {
    console.error('[API Admin Notifications POST Error]:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
