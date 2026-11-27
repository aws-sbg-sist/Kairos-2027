import crypto from 'crypto';
import { cookies } from 'next/headers';
import { AdminTab, AdminLead, ADMIN_LEADS } from './cadre_leads';

function getMasterSecret(): string {
  const secret = process.env.ADMIN_MASTER_SECRET?.trim() || process.env.SESSION_SECRET?.trim();
  if (!secret) {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('ADMIN_MASTER_SECRET (or SESSION_SECRET) environment variable is mandatory in production');
    }
    return 'kairos-local-dev-admin-secret-do-not-use-in-prod';
  }
  return secret;
}

export function getLeadPasskey(lead: AdminLead): string {
  const envVal = process.env[lead.envVarName]?.trim();
  if (envVal) return envVal;
  return lead.defaultPasskey;
}

export function verifyLeadAuthentication(
  organizerName: string,
  passkey: string
): { success: boolean; lead?: AdminLead; isSuperadmin?: boolean } {
  if (!organizerName || !passkey) {
    return { success: false };
  }

  const cleanPass = passkey.trim();
  const cleanName = organizerName.trim().toLowerCase();

  // 1. Check emergency master secret (Apex fallback)
  const masterSecret = process.env.ADMIN_MASTER_SECRET?.trim() || process.env.SESSION_SECRET?.trim();
  if (masterSecret) {
    const bufEntered = Buffer.from(cleanPass, 'utf8');
    const bufMaster = Buffer.from(masterSecret, 'utf8');
    if (bufEntered.length === bufMaster.length && crypto.timingSafeEqual(bufEntered, bufMaster)) {
      const apexLead = ADMIN_LEADS.find(l => l.id === 'org-thenappan') || ADMIN_LEADS[0];
      return { success: true, lead: apexLead, isSuperadmin: true };
    }
  }

  // 2. Match selected lead
  const lead = ADMIN_LEADS.find(l => 
    l.name.toLowerCase() === cleanName || 
    l.id.toLowerCase() === cleanName ||
    l.name.toLowerCase().includes(cleanName) ||
    cleanName.includes(l.name.toLowerCase().split(' ')[0])
  );

  if (!lead) {
    return { success: false };
  }

  const expectedPasskey = getLeadPasskey(lead);
  const bufEntered = Buffer.from(cleanPass, 'utf8');
  const bufExpected = Buffer.from(expectedPasskey, 'utf8');

  if (bufEntered.length !== bufExpected.length) {
    return { success: false };
  }

  const matches = crypto.timingSafeEqual(bufEntered, bufExpected);
  if (!matches) {
    return { success: false };
  }

  const isSuperadmin = lead.id === 'org-thenappan';
  return { success: true, lead, isSuperadmin };
}

const COOKIE_NAME = 'kairos_admin_session';

export interface AdminSession {
  organizerName: string;
  organizerRole: string;
  leadId?: string;
  pipelineName?: string;
  allowedTabs: AdminTab[];
  isSuperadmin: boolean;
  authenticatedAt: number;
}

export function isAdminAuthConfigured(): boolean {
  return true;
}

export function createAdminToken(
  organizerName: string, 
  organizerRole: string,
  extra?: { leadId?: string; pipelineName?: string; allowedTabs?: AdminTab[]; isSuperadmin?: boolean }
): string {
  const secret = getMasterSecret();
  
  // Resolve RBAC lead metadata if not explicitly provided
  const matchedLead = ADMIN_LEADS.find(l => 
    l.name.toLowerCase() === organizerName.toLowerCase() ||
    l.id === extra?.leadId
  );

  const allowedTabs: AdminTab[] = extra?.allowedTabs || (matchedLead ? matchedLead.allowedTabs : ['analytics', 'teams', 'waitlist']);
  const pipelineName = extra?.pipelineName || (matchedLead ? matchedLead.pipelineName : 'Operations Pipeline');
  const leadId = extra?.leadId || (matchedLead ? matchedLead.id : 'org-unknown');
  const isSuperadmin = extra?.isSuperadmin ?? (leadId === 'org-thenappan');

  const payload = JSON.stringify({
    organizerName,
    organizerRole,
    leadId,
    pipelineName,
    allowedTabs,
    isSuperadmin,
    authenticatedAt: Date.now()
  });

  const hmac = crypto.createHmac('sha256', secret).update(payload).digest('hex');
  return Buffer.from(`${payload}::${hmac}`).toString('base64');
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    const secret = getMasterSecret();
    if (!token) return null;

    const raw = Buffer.from(token, 'base64').toString('utf-8');
    const sep = raw.lastIndexOf('::');
    if (sep <= 0) return null;
    const payload = raw.slice(0, sep);
    const signature = raw.slice(sep + 2);
    if (!payload || !signature) return null;

    const expectedSig = crypto.createHmac('sha256', secret).update(payload).digest('hex');
    const sigBuf = Buffer.from(signature, 'utf8');
    const expectedBuf = Buffer.from(expectedSig, 'utf8');
    if (sigBuf.length !== expectedBuf.length) {
      return null;
    }
    if (!crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const data: any = JSON.parse(payload);
    // 7-day session validity
    if (Date.now() - data.authenticatedAt > 7 * 24 * 60 * 60 * 1000) {
      return null;
    }

    // Ensure allowedTabs and isSuperadmin exist
    const matchedLead = ADMIN_LEADS.find(l => 
      l.id === data.leadId || 
      l.name.toLowerCase() === (data.organizerName || '').toLowerCase()
    );

    const allowedTabs: AdminTab[] = Array.isArray(data.allowedTabs) 
      ? data.allowedTabs 
      : (matchedLead ? matchedLead.allowedTabs : ['analytics', 'teams', 'waitlist']);

    const isSuperadmin = data.isSuperadmin ?? (data.leadId === 'org-thenappan' || data.organizerRole?.toLowerCase().includes('president'));

    return {
      organizerName: data.organizerName || 'Organizer',
      organizerRole: data.organizerRole || 'Organizer Lead',
      leadId: data.leadId || matchedLead?.id,
      pipelineName: data.pipelineName || matchedLead?.pipelineName || 'Operations Pipeline',
      allowedTabs,
      isSuperadmin,
      authenticatedAt: data.authenticatedAt
    };
  } catch {
    return null;
  }
}

export function verifyAdminPasskey(passkey: string, organizerName?: string): boolean {
  if (!passkey) return false;
  if (organizerName) {
    const res = verifyLeadAuthentication(organizerName, passkey);
    return res.success;
  }
  const secret = getMasterSecret();
  const buffA = Buffer.from(passkey.trim(), 'utf8');
  const buffB = Buffer.from(secret.trim(), 'utf8');
  if (buffA.length !== buffB.length) return false;
  return crypto.timingSafeEqual(buffA, buffB);
}

export async function getCurrentAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyAdminToken(token);
}

export { COOKIE_NAME };
export { sanitizeCsvCell } from './csv';
