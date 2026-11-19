/**
 * KAIROS 2027 — CLOUD MEDIA & ASSET RESOLVER
 * 
 * Offloads heavy media delivery (videos, high-res images, PDFs) from
 * local PaaS hosting (Render storage) to Supabase Storage & PostgreSQL CDN.
 */

const SUPABASE_STORAGE_BASE = (process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://nwdpzcaxmfvcobnfwdwa.supabase.co') + '/storage/v1/object/public/assets';

export function getCloudAssetUrl(assetPath: string): string {
  if (!assetPath) return '';
  if (assetPath.startsWith('http://') || assetPath.startsWith('https://')) {
    return assetPath;
  }
  
  // Normalize leading slash
  const clean = assetPath.startsWith('/') ? assetPath.slice(1) : assetPath;

  // If pointing to assets/
  if (clean.startsWith('assets/')) {
    const filename = clean.replace(/^assets\//, '');
    return `${SUPABASE_STORAGE_BASE}/${filename}`;
  }

  // If pointing to docs/
  if (clean.startsWith('docs/')) {
    const filename = clean.replace(/^docs\//, '');
    return `${SUPABASE_STORAGE_BASE}/docs/${filename}`;
  }

  return `${SUPABASE_STORAGE_BASE}/${clean}`;
}

export const CLOUD_ASSETS = {
  logoRevealVideo: `${SUPABASE_STORAGE_BASE}/kairos-logo-reveal.mp4`,
  sponsorshipProspectusPdf: `${SUPABASE_STORAGE_BASE}/docs/KAIROS_2027_Sponsorship_Prospectus.pdf`,
  partnershipProposalPdf: `${SUPABASE_STORAGE_BASE}/docs/KAIROS_2027_Partnership_Proposal.pdf`,
  collaborate: `${SUPABASE_STORAGE_BASE}/collaborate.png`,
  time: `${SUPABASE_STORAGE_BASE}/time.png`,
  codingWorkspace: `${SUPABASE_STORAGE_BASE}/coding-workspace.png`,
  achievement: `${SUPABASE_STORAGE_BASE}/achievement.png`,
  venueIllustration: `${SUPABASE_STORAGE_BASE}/venue-illustration.png`,
  innov: `${SUPABASE_STORAGE_BASE}/innov.png`,
  wordmark: `${SUPABASE_STORAGE_BASE}/kairos-wordmark.png`,
  hourglass: `${SUPABASE_STORAGE_BASE}/kairos-hourglass.png`,
} as const;
