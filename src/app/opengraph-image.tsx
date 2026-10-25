import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'KAIROS 2027 | Grand Edition — National Technical Hackathon';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#070913',
          backgroundImage: 'radial-gradient(circle at 50% 30%, rgba(124, 58, 237, 0.35) 0%, rgba(7, 9, 19, 1) 75%)',
          color: '#ffffff',
          padding: '60px 80px',
          fontFamily: 'system-ui, sans-serif',
          border: '2px solid rgba(124, 58, 237, 0.3)',
        }}
      >
        {/* Top Tagline & Organizer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '8px 20px',
              borderRadius: '9999px',
              backgroundColor: 'rgba(124, 58, 237, 0.25)',
              border: '1px solid rgba(168, 85, 247, 0.4)',
              fontSize: '18px',
              fontWeight: 600,
              color: '#c084fc',
            }}
          >
            <span>AWS STUDENT BUILDER GROUP • SIST CHAPTER</span>
          </div>

          <div
            style={{
              fontSize: '18px',
              color: '#38bdf8',
              fontWeight: 700,
              letterSpacing: '1px',
            }}
          >
            CHENNAI • 22–24 JANUARY 2027
          </div>
        </div>

        {/* Center Title & Slogan */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginTop: '20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              fontSize: '84px',
              fontWeight: 900,
              letterSpacing: '-2px',
              lineHeight: 1,
              marginBottom: '16px',
              background: 'linear-gradient(to right, #ffffff, #c084fc, #38bdf8)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            KAIROS 2027
          </div>

          <div
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#e2e8f0',
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            GRAND EDITION • 48-HOUR NATIONAL HACKATHON
          </div>

          <div
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              fontStyle: 'italic',
            }}
          >
            &ldquo;Where Innovation Meets Its Moment&rdquo;
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            width: '100%',
          }}
        >
          {[
            '₹0 Free Merit Entry',
            '75 Elite Teams',
            '5 Technical Tracks',
            'Sathyabama Indoor Stadium',
          ].map((tag, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px 24px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '16px',
                fontWeight: 600,
                color: '#f8fafc',
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
