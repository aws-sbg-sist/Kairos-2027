const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY / SUPABASE_SECRET_KEY environment variable.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false }
});

const storePath = path.join(__dirname, '..', 'data', 'kairos_store.json');
const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

async function migrate() {
  console.log('Migrating remaining records (radar signals & team members)...');

  // Fetch all profile IDs currently in DB
  const { data: dbProfiles } = await supabase.from('profiles').select('id, email');
  const validProfileIds = new Set((dbProfiles || []).map(p => p.id));
  const emailToProfileId = new Map((dbProfiles || []).map(p => [p.email.toLowerCase(), p.id]));

  // Team Members
  const teamMembers = [];
  for (const t of store.teams) {
    if (Array.isArray(t.members)) {
      for (const m of t.members) {
        const email = (m.email || '').toLowerCase();
        const profId = emailToProfileId.get(email);
        teamMembers.push({
          id: m.id || `tm-${Math.random().toString(36).substring(2, 10)}`,
          team_id: t.id,
          profile_id: validProfileIds.has(profId) ? profId : null,
          name: m.name || 'Student Builder',
          email: m.email,
          phone: m.phone || null,
          college_reg_no: m.collegeRegNo || null,
          role: m.role || 'Frontend',
          college: m.college || 'SIST',
          meetup_profile_url: m.meetupProfileUrl || null,
          meetup_member_id: m.meetupMemberId || null,
          meetup_rsvp_verified: Boolean(m.meetupRsvpVerified),
          aws_builder_center_url: m.awsBuilderCenterUrl || null,
          tshirt_size: m.tshirtSize || null,
          hoodie_size: m.hoodieSize || null,
          bus_route: m.busRoute || null,
          confirmed: m.confirmed !== false,
          created_at: m.joinedAt || m.createdAt || new Date().toISOString()
        });
      }
    }
  }

  for (let i = 0; i < teamMembers.length; i += 50) {
    const chunk = teamMembers.slice(i, i + 50);
    const { error } = await supabase.from('team_members').upsert(chunk);
    if (error) console.error('Team members error:', error.message);
  }
  console.log(`✓ ${teamMembers.length} Team members successfully upserted`);

  // Radar Signals
  const allowedRoles = ['AI / ML Specialist', 'Fullstack Engineer', 'Systems & DevOps', 'Web3 & Security', 'UI/UX & Frontend'];
  const radarRows = (store.radarSignals || []).map(rs => {
    let r = rs.role || rs.primaryRole || 'Fullstack Engineer';
    if (!allowedRoles.includes(r)) {
      if (r.includes('AI') || r.includes('ML')) r = 'AI / ML Specialist';
      else if (r.includes('DevOps') || r.includes('Systems')) r = 'Systems & DevOps';
      else if (r.includes('Security') || r.includes('Web3')) r = 'Web3 & Security';
      else if (r.includes('UI') || r.includes('Frontend')) r = 'UI/UX & Frontend';
      else r = 'Fullstack Engineer';
    }
    return {
      id: rs.id,
      profile_id: null,
      builder_name: rs.builderName,
      role: r,
      track_id: rs.trackId || rs.trackInterest || 'AI',
      skills: rs.skills || ['Intermediate'],
      college: rs.college || rs.institution || 'SIST',
      seeking: rs.seeking || rs.lookingFor || 'Teammates',
      contact_url: rs.contactUrl || rs.contactEmail || rs.contactDiscord || 'https://kairos.sathyabama.ac.in',
      created_at: rs.createdAt || new Date().toISOString()
    };
  });

  const { error: rErr } = await supabase.from('radar_signals').upsert(radarRows);
  if (rErr) console.error('Radar error:', rErr.message);
  else console.log(`✓ ${radarRows.length} Radar signals successfully upserted`);
}

migrate().catch(console.error);
