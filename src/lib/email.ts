/**
 * KAIROS 2027 — TRANSACTIONAL EMAIL & NOTIFICATION ENGINE
 * 
 * Powered by Amazon Simple Email Service (AWS SES) SDK v3.
 * Features:
 * - Production AWS SES delivery with server-side credentials or IAM role
 * - Development and test simulation mode with zero-latency mocking
 * - Idempotency & duplicate notification prevention
 * - Bounded retry strategy with exponential backoff
 * - Tamper-evident delivery logging and status tracking in database
 * - 10 Reusable responsive branded HTML email templates
 * - Non-blocking asynchronous resilience
 */

import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import crypto from 'crypto';
import { db } from './db';
import { EmailPayload, NotificationLog } from '@/types';

// Configuration
const DEFAULT_FROM = process.env.AWS_SES_FROM_EMAIL || process.env.EMAIL_FROM || 'sistawscc@gmail.com';
const SES_REGION = process.env.AWS_SES_REGION || process.env.AWS_REGION || 'ap-south-1';
const MAX_RETRY_ATTEMPTS = 3;
const DEDUPLICATION_WINDOW_MS = 10 * 60 * 1000; // 10 minutes

// Memoized AWS SES Client
let sesClientInstance: SESClient | null = null;

function isPlaceholder(val?: string): boolean {
  if (!val) return true;
  const lower = val.trim().toLowerCase();
  return lower.includes('your-') || lower.includes('placeholder') || lower.includes('example') || lower === 'xxx';
}

function getSESClient(): SESClient | null {
  const accessKeyId = process.env.AWS_SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;

  if (accessKeyId && secretAccessKey && !isPlaceholder(accessKeyId) && !isPlaceholder(secretAccessKey)) {
    if (!sesClientInstance) {
      sesClientInstance = new SESClient({
        region: SES_REGION,
        credentials: {
          accessKeyId: accessKeyId.trim(),
          secretAccessKey: secretAccessKey.trim()
        }
      });
    }
    return sesClientInstance;
  }

  // If running in AWS environment with IAM Role (EC2, ECS, Lambda)
  if (process.env.AWS_EXECUTION_ENV || process.env.AWS_CONTAINER_CREDENTIALS_RELATIVE_URI) {
    if (!sesClientInstance) {
      sesClientInstance = new SESClient({ region: SES_REGION });
    }
    return sesClientInstance;
  }

  return null;
}

export function isSESConfigured(): boolean {
  const isTestMode = process.env.NODE_ENV === 'test' || process.env.KAIROS_EMAIL_TEST_MODE === 'true';
  if (isTestMode) return false;
  const key = process.env.AWS_SES_ACCESS_KEY_ID || process.env.AWS_ACCESS_KEY_ID;
  const sec = process.env.AWS_SES_SECRET_ACCESS_KEY || process.env.AWS_SECRET_ACCESS_KEY;
  return Boolean(key && sec && !isPlaceholder(key) && !isPlaceholder(sec));
}

export interface SendEmailOptions {
  simulated?: boolean;
  forceRetryAttempts?: number;
  skipDeduplication?: boolean;
}

export interface SendEmailResult {
  success: boolean;
  simulated: boolean;
  messageId?: string;
  attempts: number;
  duplicate?: boolean;
  suppressed?: boolean;
  error?: string;
}

/**
 * Sends a transactional email with bounded exponential retries, duplicate suppression,
 * and persistent delivery status logging.
 */
export async function sendTransactionalEmail(
  payload: EmailPayload,
  options: SendEmailOptions = {}
): Promise<SendEmailResult> {
  const normTo = (payload.to || '').trim().toLowerCase();
  const template = payload.template || 'generic';
  
  // Basic email address validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!normTo || !emailRegex.test(normTo)) {
    const errorMsg = `Invalid recipient email address: "${payload.to}"`;
    console.error(`[KAIROS EMAIL ERROR]: ${errorMsg}`);
    await db.addNotificationLog({
      to: normTo || 'unknown',
      subject: payload.subject,
      template,
      status: 'FAILED',
      attempts: 1,
      idempotencyKey: payload.idempotencyKey,
      error: errorMsg
    });
    return {
      success: false,
      simulated: false,
      attempts: 1,
      error: errorMsg
    };
  }

  // Duplicate Notification Prevention (Idempotency Check)
  const idempotencyKey = payload.idempotencyKey || 
    `${template}:${normTo}:${Buffer.from(payload.subject).toString('base64').substring(0, 16)}`;

  if (!options.skipDeduplication) {
    const existing = await db.getNotificationByIdempotencyKey(idempotencyKey);
    if (existing) {
      const logTime = new Date(existing.timestamp).getTime();
      const elapsed = Date.now() - logTime;
      if (elapsed < DEDUPLICATION_WINDOW_MS && (existing.status === 'DELIVERED' || existing.status === 'SIMULATED')) {
        console.log(`[KAIROS EMAIL DEDUP]: Suppressed duplicate notification for ${normTo} (Key: ${idempotencyKey})`);
        await db.addNotificationLog({
          to: normTo,
          subject: payload.subject,
          template,
          status: 'SUPPRESSED_DUPLICATE',
          attempts: 0,
          idempotencyKey,
          messageId: existing.messageId
        });
        return {
          success: true,
          simulated: existing.status === 'SIMULATED',
          messageId: existing.messageId,
          attempts: 0,
          duplicate: true,
          suppressed: true
        };
      }
    }
  }

  const isTestMode = 
    options.simulated || 
    process.env.NODE_ENV === 'test' || 
    process.env.KAIROS_EMAIL_TEST_MODE === 'true';

  const sesClient = getSESClient();

  // --------------------------------------------------------------------------
  // 1. SIMULATION / TEST / LOCAL DEV SINK
  // --------------------------------------------------------------------------
  if (isTestMode || !sesClient) {
    const simMessageId = `ses-sim-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    
    console.log('------------------------------------------------------------');
    console.log(`[KAIROS EMAIL SINK - ${isTestMode ? 'TEST MODE' : 'LOCAL SIMULATION'}]`);
    console.log(`To:        ${normTo}`);
    console.log(`From:      ${DEFAULT_FROM}`);
    console.log(`Subject:   ${payload.subject}`);
    console.log(`Template:  ${template}`);
    console.log(`Msg ID:    ${simMessageId}`);
    console.log(`Body Snip: ${payload.text.substring(0, 100).replace(/\n/g, ' ')}...`);
    console.log('------------------------------------------------------------');

    await db.addNotificationLog({
      to: normTo,
      subject: payload.subject,
      template,
      status: 'SIMULATED',
      messageId: simMessageId,
      attempts: 1,
      idempotencyKey
    });

    return {
      success: true,
      simulated: true,
      messageId: simMessageId,
      attempts: 1
    };
  }

  // --------------------------------------------------------------------------
  // 2. PRODUCTION AWS SES DISPATCH WITH EXPONENTIAL RETRY STRATEGY
  // --------------------------------------------------------------------------
  let lastError: any = null;
  const maxAttempts = options.forceRetryAttempts || MAX_RETRY_ATTEMPTS;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const command = new SendEmailCommand({
        Source: DEFAULT_FROM,
        Destination: {
          ToAddresses: [normTo]
        },
        Message: {
          Subject: {
            Data: payload.subject,
            Charset: 'UTF-8'
          },
          Body: {
            Html: {
              Data: payload.html,
              Charset: 'UTF-8'
            },
            Text: {
              Data: payload.text,
              Charset: 'UTF-8'
            }
          }
        }
      });

      const response = await sesClient.send(command);
      const messageId = response.MessageId || `ses-${Date.now()}`;

      console.log(`[AWS SES SUCCESS] Dispatched email to ${normTo} (MessageId: ${messageId}, Attempt: ${attempt})`);

      await db.addNotificationLog({
        to: normTo,
        subject: payload.subject,
        template,
        status: 'DELIVERED',
        messageId,
        attempts: attempt,
        idempotencyKey
      });

      return {
        success: true,
        simulated: false,
        messageId,
        attempts: attempt
      };
    } catch (err: any) {
      lastError = err;
      console.warn(`[AWS SES WARN] Attempt ${attempt}/${maxAttempts} failed for ${normTo}: ${err.message}`);

      // Check if error is retryable (throttles, timeouts, 5xx)
      const isRetryable = 
        err.name === 'ThrottlingException' || 
        err.name === 'ServiceUnavailable' || 
        err.$metadata?.httpStatusCode >= 500;

      if (!isRetryable || attempt === maxAttempts) {
        break;
      }

      // Exponential backoff delay
      const backoffMs = Math.min(100 * Math.pow(2, attempt), 2000);
      await new Promise(resolve => setTimeout(resolve, backoffMs));
    }
  }

  // Record delivery failure in database log
  const errorMsg = lastError?.message || 'AWS SES delivery failed after maximum retry attempts.';
  console.error(`[AWS SES FAILURE] Failed to send email to ${normTo}: ${errorMsg}`);

  await db.addNotificationLog({
    to: normTo,
    subject: payload.subject,
    template,
    status: 'FAILED',
    attempts: maxAttempts,
    idempotencyKey,
    error: errorMsg
  });

  return {
    success: false,
    simulated: false,
    attempts: maxAttempts,
    error: errorMsg
  };
}

// ============================================================================
// BRANDED EMAIL HTML WRAPPER TEMPLATE & UTILITIES
// ============================================================================

export interface WrapEmailOptions {
  title: string;
  preheader?: string;
  badgeText?: string;
  bodyHtml: string;
  actionUrl?: string;
  actionLabel?: string;
  secondaryInfoBox?: string;
}

export function wrapKairosEmail(optsOrHtml: WrapEmailOptions | string, titleFallback?: string): string {
  const opts: WrapEmailOptions = typeof optsOrHtml === 'string'
    ? {
        title: titleFallback || 'KAIROS 2027 Official Dispatch',
        preheader: titleFallback || 'KAIROS 2027 Autonomous Hackathon',
        bodyHtml: optsOrHtml,
      }
    : optsOrHtml;

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000';
  const logoUrl = `${appUrl}/assets/kairos-hourglass.png`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${opts.title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #070712; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9; -webkit-font-smoothing: antialiased; }
    .container { max-width: 600px; margin: 32px auto; background-color: #0d0d1e; border: 1px solid rgba(147, 51, 234, 0.3); border-radius: 20px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); }
    .header { padding: 32px 32px 24px 32px; background: linear-gradient(180deg, rgba(147, 51, 234, 0.15) 0%, rgba(13, 13, 30, 0) 100%); text-align: center; border-bottom: 1px solid rgba(255, 255, 255, 0.08); }
    .brand-title { font-size: 24px; font-weight: 900; letter-spacing: -0.025em; color: #ffffff; margin: 12px 0 4px 0; }
    .brand-sub { font-size: 13px; color: #94a3b8; margin: 0; }
    .badge { display: inline-block; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-family: monospace; font-weight: bold; background-color: rgba(147, 51, 234, 0.2); color: #c084fc; border: 1px solid rgba(147, 51, 234, 0.4); margin-bottom: 8px; }
    .content { padding: 32px; font-size: 14px; line-height: 1.65; color: #cbd5e1; }
    .box { background-color: rgba(15, 23, 42, 0.8); border: 1px solid rgba(255, 255, 255, 0.1); border-left: 4px solid #a855f7; border-radius: 12px; padding: 16px 20px; margin: 24px 0; }
    .btn { display: inline-block; padding: 14px 28px; background: linear-gradient(90deg, #7e22ce 0%, #a855f7 100%); color: #ffffff !important; font-size: 14px; font-weight: bold; text-decoration: none; border-radius: 12px; text-align: center; margin: 16px 0; box-shadow: 0 10px 15px -3px rgba(126, 34, 206, 0.4); }
    .footer { padding: 24px 32px; background-color: #070712; border-top: 1px solid rgba(255, 255, 255, 0.06); font-size: 12px; color: #64748b; line-height: 1.5; text-align: center; }
    .footer a { color: #a855f7; text-decoration: none; }
  </style>
</head>
<body>
  <div style="display: none; max-height: 0px; overflow: hidden;">${opts.preheader || opts.title}</div>
  <div class="container">
    <div class="header">
      ${opts.badgeText ? `<div class="badge">${opts.badgeText}</div>` : ''}
      <div class="brand-title">KAIROS 2027</div>
      <div class="brand-sub">India's Premier 48-Hour Autonomous Hackathon · Sathyabama University</div>
    </div>
    <div class="content">
      ${opts.bodyHtml}
      ${opts.secondaryInfoBox ? `<div class="box">${opts.secondaryInfoBox}</div>` : ''}
      ${opts.actionUrl && opts.actionLabel ? `
        <div style="text-align: center; margin: 28px 0;">
          <a href="${opts.actionUrl}" class="btn" target="_blank">${opts.actionLabel} →</a>
        </div>
      ` : ''}
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px 0;">Organized by <strong>AWS Student Builder Group (SIST Chapter)</strong></p>
      <p style="margin: 0 0 8px 0;">Sathyabama Indoor Auditorium, Jeppiaar Nagar, Rajiv Gandhi Salai, Chennai, Tamil Nadu 600119</p>
      <p style="margin: 0;">Have questions? Reach our operations team at <a href="mailto:${DEFAULT_FROM}">${DEFAULT_FROM}</a></p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export function generateIdempotencyKey(prefix: string, ...parts: string[]): string {
  const joined = parts.map(p => (p || '').trim().toLowerCase()).join(':');
  const hash = crypto.createHash('sha256').update(joined).digest('hex').substring(0, 16);
  return `${prefix}:${hash}`;
}

/**
 * Backwards compatibility helper for early waitlist submissions
 */
export function buildWaitlistConfirmationEmail(fullName: string, preferredTrack: string): EmailPayload {
  return buildRegistrationConfirmationEmail({
    to: '',
    fullName,
    track: preferredTrack
  });
}

// ============================================================================
// 10 REUSABLE TRANSACTIONAL EMAIL TEMPLATES
// ============================================================================

/**
 * 1. Registration / Waitlist Confirmation Email
 */
export function buildRegistrationConfirmationEmail(data: {
  to: string;
  fullName: string;
  track: string;
  registrationId?: string;
  priority?: string;
}): EmailPayload {
  const regId = data.registrationId || `REG-${Date.now().toString(36).toUpperCase()}`;
  const subject = `KAIROS 2027 — Priority Registration Confirmed [${regId}]`;

  const html = wrapKairosEmail({
    title: subject,
    preheader: `Your builder priority for KAIROS 2027 has been confirmed for track: ${data.track}`,
    badgeText: 'REGISTRATION CONFIRMED · ZERO ENTRY FEE',
    bodyHtml: `
      <p>Hello <strong>${data.fullName}</strong>,</p>
      <p>Welcome to <strong>KAIROS 2027</strong>. Your early-interest builder registration has been officially recorded in the national tournament database.</p>
      <p>KAIROS 2027 brings together 100 elite squads, 450+ builders, and ₹1,75,000 in cash bounties for 48 hours of intense cloud engineering at the Sathyabama Indoor Auditorium (22–24 January 2027).</p>
    `,
    secondaryInfoBox: `
      <div style="font-size: 13px; color: #94a3b8; font-family: monospace;">REGISTRATION REFERENCE: <strong style="color: #ffffff;">${regId}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">SELECTED TRACK: <strong style="color: #c084fc;">${data.track}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">EVENT DATES: <strong style="color: #ffffff;">22–24 January 2027 (48-Hour Hard Freeze)</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">VENUE: <strong style="color: #ffffff;">Sathyabama Indoor Auditorium, Chennai</strong></div>
    `,
    actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal`,
    actionLabel: 'Access Builder Portal'
  });

  const text = `Hello ${data.fullName},\n\nYour priority registration for KAIROS 2027 has been confirmed!\n\nRegistration ID: ${regId}\nSelected Track: ${data.track}\nEvent Dates: 22–24 January 2027\nVenue: Sathyabama Indoor Auditorium, Chennai\n\nNext Step: Form your squad of 4–6 builders and submit your architectural abstract.\n\nAccess portal: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'registration-confirmation',
    idempotencyKey: `reg-confirm:${data.to}:${regId}`
  };
}

/**
 * 2. Email Verification
 */
export function buildEmailVerificationEmail(data: {
  to: string;
  fullName: string;
  verificationUrl: string;
  expiresHours?: number;
}): EmailPayload {
  const expires = data.expiresHours || 24;
  const subject = 'Verify Your KAIROS 2027 Student Builder Identity';

  const html = wrapKairosEmail({
    title: subject,
    preheader: 'Verify your student email address to activate your KAIROS 2027 builder account.',
    badgeText: 'SECURITY VERIFICATION',
    bodyHtml: `
      <p>Hello <strong>${data.fullName}</strong>,</p>
      <p>Thank you for creating your KAIROS 2027 account. Please verify your student email address to activate your account and access squad management tools.</p>
      <p style="color: #94a3b8; font-size: 13px;">This verification link will expire in <strong>${expires} hours</strong>. If you did not create this account, you can safely disregard this email.</p>
    `,
    actionUrl: data.verificationUrl,
    actionLabel: 'Verify Email & Activate Account',
    secondaryInfoBox: `
      <div style="font-size: 12px; color: #94a3b8;">If the button does not work, copy and paste this URL into your browser:</div>
      <div style="font-size: 11px; color: #c084fc; word-break: break-all; margin-top: 4px; font-family: monospace;">${data.verificationUrl}</div>
    `
  });

  const text = `Hello ${data.fullName},\n\nPlease verify your email address to activate your KAIROS 2027 account:\n\n${data.verificationUrl}\n\nThis link expires in ${expires} hours.\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'email-verification',
    idempotencyKey: `email-verify:${data.to}`
  };
}

/**
 * 3. Password Reset
 */
export function buildPasswordResetEmail(data: {
  to: string;
  fullName: string;
  resetUrl: string;
  expiresHours?: number;
}): EmailPayload {
  const expires = data.expiresHours || 1;
  const subject = 'KAIROS 2027 — Password Reset Request';

  const html = wrapKairosEmail({
    title: subject,
    preheader: 'A password reset was requested for your KAIROS 2027 builder account.',
    badgeText: 'ACCOUNT SECURITY',
    bodyHtml: `
      <p>Hello <strong>${data.fullName}</strong>,</p>
      <p>We received a request to reset the password associated with your KAIROS 2027 builder account.</p>
      <p>Click the button below to establish a new password. For security purposes, this password reset link is strictly valid for <strong>${expires} hour</strong>.</p>
      <p style="color: #94a3b8; font-size: 12px;">If you did not request a password reset, your account remains secure and no further action is necessary.</p>
    `,
    actionUrl: data.resetUrl,
    actionLabel: 'Reset Account Password',
    secondaryInfoBox: `
      <div style="font-size: 12px; color: #94a3b8;">Direct Reset Link:</div>
      <div style="font-size: 11px; color: #c084fc; word-break: break-all; margin-top: 4px; font-family: monospace;">${data.resetUrl}</div>
    `
  });

  const text = `Hello ${data.fullName},\n\nA password reset was requested for your KAIROS 2027 account.\n\nReset your password here:\n${data.resetUrl}\n\nThis link expires in ${expires} hour. If you did not request this, please ignore.\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'password-reset',
    idempotencyKey: `pwd-reset:${data.to}`
  };
}

/**
 * 4. Team Creation Confirmation
 */
export function buildTeamCreationEmail(data: {
  to: string;
  leaderName: string;
  teamName: string;
  teamCode: string;
  inviteCode: string;
  track?: string;
  trackName?: string;
}): EmailPayload {
  const track = data.track || data.trackName || 'General Technical Track';
  const subject = `KAIROS 2027 — Squad Created: ${data.teamName} [${data.teamCode}]`;

  const html = wrapKairosEmail({
    title: subject,
    preheader: `Squad ${data.teamName} created successfully with Team Code ${data.teamCode}`,
    badgeText: 'TEAM LEADER ONBOARDING',
    bodyHtml: `
      <p>Congratulations <strong>${data.leaderName}</strong>,</p>
      <p>Your engineering squad <strong>${data.teamName}</strong> has been successfully registered for KAIROS 2027.</p>
      <p>As Team Leader, you hold administrative authority to invite up to 5 additional student builders, update project abstracts, and submit your official technical deliverables.</p>
    `,
    secondaryInfoBox: `
      <div style="font-size: 13px; color: #94a3b8; font-family: monospace;">OFFICIAL TEAM CODE: <strong style="color: #c084fc;">${data.teamCode}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px; font-family: monospace;">TEAM INVITATION CODE: <strong style="color: #38bdf8;">${data.inviteCode}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">COMPETITION TRACK: <strong style="color: #ffffff;">${track}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">SQUAD SIZE: <strong style="color: #ffffff;">1/6 Confirmed Builders</strong></div>
    `,
    actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal`,
    actionLabel: 'Manage Squad Roster'
  });

  const text = `Hello ${data.leaderName},\n\nYour squad "${data.teamName}" is officially registered for KAIROS 2027!\n\nTeam Code: ${data.teamCode}\nInvitation Code: ${data.inviteCode}\nTrack: ${track}\n\nShare your invitation code with your teammates to build out your squad roster.\n\nPortal: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'team-creation',
    idempotencyKey: `team-create:${data.teamCode}`
  };
}

/**
 * 5. Team Invitation Email
 */
export function buildTeamInvitationEmail(data: {
  to: string;
  inviteeName?: string;
  recipientName?: string;
  leaderName?: string;
  inviterName?: string;
  teamName: string;
  teamCode: string;
  inviteCode: string;
  track?: string;
  trackName?: string;
  joinUrl?: string;
  expiresIn?: string;
}): EmailPayload {
  const leader = data.leaderName || data.inviterName || 'Team Leader';
  const invitee = data.inviteeName || data.recipientName;
  const track = data.track || data.trackName || 'General Technical Track';
  const joinUrl = data.joinUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/team/join?code=${data.inviteCode}`;
  const subject = `KAIROS 2027 — Invitation to Join ${data.teamName} [${data.teamCode}]`;

  const html = wrapKairosEmail({
    title: subject,
    preheader: `${leader} has invited you to join engineering squad ${data.teamName} for KAIROS 2027.`,
    badgeText: 'TEAM INVITATION',
    bodyHtml: `
      <p>Hello${invitee ? ` <strong>${invitee}</strong>` : ''},</p>
      <p><strong>${leader}</strong> has invited you to join squad <strong>${data.teamName}</strong> for the KAIROS 2027 48-Hour National Hackathon.</p>
      <p>Together, you will compete against 100 elite squads for ₹1,75,000 in cash bounties across cloud architecture, AI swarms, and high-throughput systems.</p>
    `,
    secondaryInfoBox: `
      <div style="font-size: 13px; color: #94a3b8;">INVITING TEAM: <strong style="color: #ffffff;">${data.teamName} (${data.teamCode})</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">TEAM LEADER: <strong style="color: #ffffff;">${leader}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">COMPETITION TRACK: <strong style="color: #c084fc;">${track}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px; font-family: monospace;">INVITATION CODE: <strong style="color: #38bdf8;">${data.inviteCode}</strong></div>
    `,
    actionUrl: joinUrl,
    actionLabel: 'Accept Invitation & Join Squad'
  });

  const text = `Hello${invitee ? ` ${invitee}` : ''},\n\n${leader} has invited you to join squad "${data.teamName}" (${data.teamCode}) for KAIROS 2027!\n\nTrack: ${track}\nInvitation Code: ${data.inviteCode}\n\nAccept invitation here:\n${joinUrl}\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'team-invitation',
    idempotencyKey: `team-invite:${data.teamCode}:${data.to}`
  };
}

/**
 * 6. Team Joining Confirmation
 */
export function buildTeamJoiningConfirmationEmail(data: {
  to: string;
  memberName: string;
  teamName: string;
  teamCode: string;
  leaderName?: string;
  role?: string;
  trackName?: string;
  rosterCount?: number;
}): EmailPayload {
  const leader = data.leaderName || 'Team Leader';
  const count = data.rosterCount || 2;
  const subject = `KAIROS 2027 — Successfully Joined ${data.teamName}`;

  const html = wrapKairosEmail({
    title: subject,
    preheader: `You are now a confirmed member of ${data.teamName} (${data.teamCode}).`,
    badgeText: 'ROSTER UPDATE CONFIRMED',
    bodyHtml: `
      <p>Hello <strong>${data.memberName}</strong>,</p>
      <p>You have officially joined engineering squad <strong>${data.teamName}</strong> for KAIROS 2027${data.role ? ` as <strong>${data.role}</strong>` : ''}.</p>
      <p>Coordinate with Team Leader <strong>${leader}</strong> to finalize your architectural proposal and prototype roadmap.</p>
    `,
    secondaryInfoBox: `
      <div style="font-size: 13px; color: #94a3b8; font-family: monospace;">TEAM CODE: <strong style="color: #ffffff;">${data.teamCode}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">SQUAD NAME: <strong style="color: #c084fc;">${data.teamName}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">TEAM LEADER: <strong style="color: #ffffff;">${leader}</strong></div>
      ${data.role ? `<div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">ASSIGNED ROLE: <strong style="color: #38bdf8;">${data.role}</strong></div>` : ''}
    `,
    actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal`,
    actionLabel: 'View Squad Dashboard'
  });

  const text = `Hello ${data.memberName},\n\nYou are now a confirmed member of squad "${data.teamName}" (${data.teamCode}) for KAIROS 2027!\n\nTeam Leader: ${leader}\n${data.role ? `Role: ${data.role}\n` : ''}Portal: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'team-joining-confirmation',
    idempotencyKey: `join-confirm:${data.teamCode}:${data.to}`
  };
}

/**
 * 7. Abstract Review Decision (Shortlisted or Waitlisted/Rejected)
 */
export function buildAbstractReviewEmail(data: {
  to: string;
  leaderName: string;
  teamName: string;
  teamCode: string;
  status: 'SHORTLISTED' | 'REJECTED' | 'UNDER_REVIEW' | string;
  remarks?: string;
  notes?: string;
  trackName?: string;
  deskBay?: string;
}): EmailPayload {
  const isShortlisted = data.status === 'SHORTLISTED' || data.status === 'ON_CAMPUS_QUALIFIED' || data.status === 'ONLINE_SEMI_FINALIST';
  const remarks = data.remarks || data.notes || '';
  const subject = isShortlisted
    ? `🎉 KAIROS 2027 — Official Selection: ${data.teamName} Qualified for On-Campus Finals!`
    : `KAIROS 2027 — Abstract Review Decision: ${data.teamName}`;

  const bodyHtml = isShortlisted
    ? `
      <p>Congratulations <strong>${data.leaderName}</strong> and team <strong>${data.teamName}</strong>!</p>
      <p>Following comprehensive review by the Technical Screening Jury, your project abstract has been <strong>OFFICIALLY SHORTLISTED</strong> for the KAIROS 2027 On-Campus Grand Finale at Sathyabama Indoor Auditorium, Chennai (22–24 January 2027).</p>
      <p>Your team has been selected among the top 100 national squads from across 2,400+ builder submissions.</p>
    `
    : `
      <p>Hello <strong>${data.leaderName}</strong>,</p>
      <p>Thank you for submitting your architectural proposal for KAIROS 2027. Following exhaustive technical evaluation, your proposal for squad <strong>${data.teamName}</strong> was not selected for the top 100 on-campus cohort.</p>
      <p>Due to auditorium capacity limits, selection was exceptionally competitive. We strongly encourage your team to continue building, join our open builder community sessions, and apply for future hackathons.</p>
    `;

  const infoBox = isShortlisted
    ? `
      <div style="font-size: 13px; color: #94a3b8; font-family: monospace;">QUALIFIED TEAM CODE: <strong style="color: #c084fc;">${data.teamCode}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">DESK BAY ALLOCATION: <strong style="color: #38bdf8;">${data.deskBay || 'Bay Allocated at Registration Desk'}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">REPORTING TIME: <strong style="color: #ffffff;">Friday, 22 Jan 2027 · 08:00 AM IST</strong></div>
      ${remarks ? `<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">JURY REMARKS: <em style="color: #e2e8f0;">"${remarks}"</em></div>` : ''}
    `
    : `
      <div style="font-size: 13px; color: #94a3b8; font-family: monospace;">TEAM CODE: <strong style="color: #ffffff;">${data.teamCode}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">STATUS: <strong style="color: #ef4444;">WAITLIST / NOT SHORTLISTED</strong></div>
      ${remarks ? `<div style="font-size: 13px; color: #94a3b8; margin-top: 8px;">REVIEW FEEDBACK: <em style="color: #e2e8f0;">"${remarks}"</em></div>` : ''}
    `;

  const html = wrapKairosEmail({
    title: subject,
    preheader: isShortlisted ? `Squad ${data.teamName} is officially shortlisted for KAIROS 2027!` : `Abstract decision update for ${data.teamName}`,
    badgeText: isShortlisted ? 'FINALS QUALIFIER · ON-CAMPUS COHORT' : 'REVIEW UPDATE',
    bodyHtml,
    secondaryInfoBox: infoBox,
    actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal`,
    actionLabel: isShortlisted ? 'Access Participant Pass & Logistics' : 'View Application Summary'
  });

  const text = isShortlisted
    ? `Congratulations ${data.leaderName}!\n\nSquad "${data.teamName}" (${data.teamCode}) has been SHORTLISTED for KAIROS 2027 On-Campus Grand Finale!\n\nVenue: Sathyabama Indoor Auditorium, Chennai\nReporting: 22 Jan 2027, 08:00 AM IST\nDesk Bay: ${data.deskBay || 'Assigned on arrival'}\n\nAccess portal: ${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal\n\nAWS Student Builder Group (SIST Chapter)`
    : `Hello ${data.leaderName},\n\nUpdate on squad "${data.teamName}" (${data.teamCode}): Your abstract was not selected for the top 100 on-campus cohort.\n\nRemarks: ${remarks || 'Thank you for your submission.'}\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'abstract-review-decision',
    idempotencyKey: `abstract-decision:${data.teamCode}:${data.status}`
  };
}

/**
 * 8. Qualifier Submission Confirmation
 */
export function buildQualifierSubmissionEmail(data: {
  to: string;
  leaderName: string;
  teamName: string;
  teamCode: string;
  githubUrl: string;
  loomUrl?: string;
  loomVideoUrl?: string;
  defenseSlot?: string;
}): EmailPayload {
  const loom = data.loomUrl || data.loomVideoUrl || 'Submitted via portal';
  const subject = `KAIROS 2027 — Qualifier Artifacts Received [${data.teamCode}]`;

  const html = wrapKairosEmail({
    title: subject,
    preheader: `Technical submission recorded for squad ${data.teamName}.`,
    badgeText: 'SUBMISSION COMMITTED',
    bodyHtml: `
      <p>Hello <strong>${data.leaderName}</strong>,</p>
      <p>Your team <strong>${data.teamName}</strong> has successfully committed official technical deliverables for the KAIROS 2027 qualifier review.</p>
      <p>The Jury will inspect your repository commit tree and architectural walkthrough video during checkpoint evaluations.</p>
    `,
    secondaryInfoBox: `
      <div style="font-size: 13px; color: #94a3b8; font-family: monospace;">TEAM CODE: <strong style="color: #ffffff;">${data.teamCode}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">GITHUB REPOSITORY: <a href="${data.githubUrl}" style="color: #c084fc;">${data.githubUrl}</a></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">WALKTHROUGH VIDEO: <a href="${loom}" style="color: #38bdf8;">${loom}</a></div>
      ${data.defenseSlot ? `<div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">DEFENSE SLOT: <strong style="color: #ffffff;">${data.defenseSlot}</strong></div>` : ''}
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">STATUS: <strong style="color: #10b981;">SUBMITTED FOR JURY REVIEW</strong></div>
    `,
    actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/portal`,
    actionLabel: 'Review Submission Status'
  });

  const text = `Hello ${data.leaderName},\n\nTechnical artifacts received for squad "${data.teamName}" (${data.teamCode})!\n\nGitHub Repo: ${data.githubUrl}\nVideo Demo: ${loom}\n${data.defenseSlot ? `Defense Slot: ${data.defenseSlot}\n` : ''}Status: SUBMITTED FOR JURY REVIEW\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'qualifier-submission-confirmation',
    idempotencyKey: `qualifier-submit:${data.teamCode}`
  };
}

/**
 * 9. Event Announcements Broadcast
 */
export function buildEventAnnouncementEmail(data: {
  to: string;
  recipientName: string;
  title: string;
  content?: string;
  summary?: string;
  urgency?: 'NORMAL' | 'HIGH' | 'CRITICAL' | 'INFO' | 'MEDIUM';
  category?: string;
  actionUrl?: string;
  actionLabel?: string;
}): EmailPayload {
  const content = data.content || data.summary || '';
  const urgencyRaw = (data.urgency || 'NORMAL').toUpperCase();
  const urgency = urgencyRaw === 'CRITICAL' || urgencyRaw === 'HIGH' ? urgencyRaw : 'NORMAL';
  const prefix = urgency === 'CRITICAL' ? '🚨 URGENT: ' : (urgency === 'HIGH' ? '⚡ ' : '');
  const subject = `${prefix}KAIROS 2027 — ${data.title}`;

  const badgeText = urgency === 'CRITICAL' ? 'CRITICAL BULLETIN' : (urgency === 'HIGH' ? 'IMPORTANT UPDATE' : 'EVENT BULLETIN');

  const html = wrapKairosEmail({
    title: subject,
    preheader: data.title,
    badgeText,
    bodyHtml: `
      <p>Hello <strong>${data.recipientName}</strong>,</p>
      <h3 style="color: #ffffff; margin-top: 16px;">${data.title}</h3>
      <div style="line-height: 1.7; color: #cbd5e1;">${content.replace(/\n/g, '<br/>')}</div>
    `,
    actionUrl: data.actionUrl || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}`,
    actionLabel: data.actionLabel || 'Visit Platform'
  });

  const text = `Hello ${data.recipientName},\n\n[KAIROS 2027 BULLETIN: ${data.title}]\n\n${content}\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'event-announcement',
    idempotencyKey: `announcement:${data.title}:${data.to}`
  };
}

/**
 * 10. Participant Check-in Confirmation
 */
export function buildCheckinConfirmationEmail(data: {
  to: string;
  participantName: string;
  teamName: string;
  teamCode: string;
  deskBay?: string;
  deskBayAllocation?: string;
  awsCreditVoucher?: string;
  checkedInAt?: string;
}): EmailPayload {
  const desk = data.deskBay || data.deskBayAllocation || 'Assigned on arrival';
  const checkInTime = data.checkedInAt || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const subject = `KAIROS 2027 — Arena Check-in Confirmed: ${data.teamCode} [${desk}]`;

  const html = wrapKairosEmail({
    title: subject,
    preheader: `Check-in verified for ${data.participantName} at Desk Bay ${desk}.`,
    badgeText: 'ON-CAMPUS CHECK-IN VERIFIED',
    bodyHtml: `
      <p>Welcome to Sathyabama Indoor Auditorium, <strong>${data.participantName}</strong>!</p>
      <p>Your on-campus check-in for squad <strong>${data.teamName}</strong> (${data.teamCode}) has been successfully processed at the Registration Desk.</p>
      <p>Head to your assigned desk bay to claim your power outlets, high-speed Wi-Fi, and welcome kit.</p>
    `,
    secondaryInfoBox: `
      <div style="font-size: 13px; color: #94a3b8; font-family: monospace;">ALLOCATED DESK BAY: <strong style="color: #38bdf8; font-size: 15px;">${desk}</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">SQUAD: <strong style="color: #ffffff;">${data.teamName} (${data.teamCode})</strong></div>
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">CHECK-IN TIME: <strong style="color: #ffffff;">${checkInTime}</strong></div>
      ${data.awsCreditVoucher ? `<div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">AWS PROMOTIONAL VOUCHER: <strong style="color: #10b981;">${data.awsCreditVoucher}</strong></div>` : ''}
      <div style="font-size: 13px; color: #94a3b8; margin-top: 4px;">AUDITORIUM WI-FI SSID: <strong style="color: #c084fc;">KAIROS-ARENA-5G</strong></div>
    `,
    actionUrl: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:8000'}/stage`,
    actionLabel: 'Launch Stage Display'
  });

  const text = `Welcome ${data.participantName}!\n\nYour on-campus check-in is complete for squad "${data.teamName}" (${data.teamCode})!\n\nAllocated Desk Bay: ${desk}\nCheck-in Time: ${checkInTime}\nAuditorium Wi-Fi: KAIROS-ARENA-5G\n\nAWS Student Builder Group (SIST Chapter)`;

  return {
    to: data.to,
    subject,
    html,
    text,
    template: 'checkin-confirmation',
    idempotencyKey: `checkin-confirm:${data.teamCode}:${data.to}`
  };
}
