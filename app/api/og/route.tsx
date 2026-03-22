import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get dynamic params
    const title = searchParams.get('title') || 'Ziyaad Adams';
    const subtitle = searchParams.get('subtitle') || 'Senior Salesforce Engineer';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#000000',
            backgroundImage: 'radial-gradient(circle at 50% 50%, #111111 0%, #000000 100%)',
            padding: '80px',
          }}
        >
          {/* Decorative element */}
          <div
            style={{
              position: 'absolute',
              top: '40px',
              right: '40px',
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.1)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              left: '40px',
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              border: '2px solid rgba(255,255,255,0.08)',
            }}
          />
          
          {/* Main content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 500,
                color: 'rgba(255,255,255,0.5)',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              Portfolio
            </div>
            <div
              style={{
                fontSize: '80px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '0.02em',
              }}
            >
              {subtitle}
            </div>
            <div
              style={{
                marginTop: '40px',
                display: 'flex',
                gap: '16px',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#00A1E0',
                }}
              />
              <div
                style={{
                  fontSize: '24px',
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.1em',
                }}
              >
                Salesforce Certified · Enterprise Architecture
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
