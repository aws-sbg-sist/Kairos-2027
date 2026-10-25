export function generateKairosICS(): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AWS Student Builder Group SIST//KAIROS 2027//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:KAIROS 2027 Hackathon',
    'X-WR-TIMEZONE:Asia/Kolkata',
    
    // VTIMEZONE for Asia/Kolkata
    'BEGIN:VTIMEZONE',
    'TZID:Asia/Kolkata',
    'BEGIN:STANDARD',
    'DTSTART:19700101T000000',
    'TZOFFSETFROM:+0530',
    'TZOFFSETTO:+0530',
    'TZNAME:IST',
    'END:STANDARD',
    'END:VTIMEZONE',

    // Master Event
    'BEGIN:VEVENT',
    'UID:kairos-2027-main-event@awssbg-sist.in',
    'DTSTAMP:20261025T090000Z',
    'DTSTART;TZID=Asia/Kolkata:20270122T113000',
    'DTEND;TZID=Asia/Kolkata:20270124T170000',
    'SUMMARY:KAIROS 2027 | Grand Edition (48-Hour National Hackathon)',
    'DESCRIPTION:The 48-Hour National Technical Hackathon organized by AWS Student Builder Group - SIST Chapter. Venue: Sathyabama Indoor Stadium. 75 Teams. 5 Technical Tracks. 7 Principal Meals Provided.',
    'LOCATION:Sathyabama Indoor Stadium, Sathyabama Institute of Science and Technology, Chennai, Tamil Nadu 600119, India',
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: KAIROS 2027 begins tomorrow at Sathyabama Indoor Stadium!',
    'END:VALARM',
    'END:VEVENT',

    // Code Freeze Milestone
    'BEGIN:VEVENT',
    'UID:kairos-2027-code-freeze@awssbg-sist.in',
    'DTSTAMP:20261025T090000Z',
    'DTSTART;TZID=Asia/Kolkata:20270124T113000',
    'DTEND;TZID=Asia/Kolkata:20270124T121500',
    'SUMMARY:KAIROS 2027 — Code Freeze & Top 20 Finalist Verification',
    'DESCRIPTION:48-hour competition clock expires! Repositories locked and Top 20 Finalists announced for main stage defense.',
    'LOCATION:Sathyabama Indoor Stadium Stage',
    'STATUS:CONFIRMED',
    'END:VEVENT',

    // Grand Stage Demos & Valedictory
    'BEGIN:VEVENT',
    'UID:kairos-2027-demos-valedictory@awssbg-sist.in',
    'DTSTAMP:20261025T090000Z',
    'DTSTART;TZID=Asia/Kolkata:20270124T121500',
    'DTEND;TZID=Asia/Kolkata:20270124T170000',
    'SUMMARY:KAIROS 2027 — Final Stage Demos & Grand Valedictory Awards',
    'DESCRIPTION:Top 20 teams live stage demonstrations before the Grand Jury, followed by announcement of National Champions and Track Winners.',
    'LOCATION:Sathyabama Indoor Stadium Stage',
    'STATUS:CONFIRMED',
    'END:VEVENT',

    'END:VCALENDAR'
  ];

  return lines.join('\r\n');
}
