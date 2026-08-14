import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
export const alt = '住所データ自動整形ツール'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '80px',
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 120,
          height: 120,
          background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
          borderRadius: 32,
          marginBottom: 40,
          boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.4)'
        }}>
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
             <line x1="9" y1="3" x2="9" y2="21"></line>
             <line x1="15" y1="3" x2="15" y2="21"></line>
           </svg>
        </div>
        <h1
          style={{
            fontSize: 72,
            fontWeight: 'bold',
            color: '#0f172a',
            marginBottom: 24,
            textAlign: 'center',
            letterSpacing: '-0.02em',
          }}
        >
          住所データ自動整形ツール
        </h1>
        <p
          style={{
            fontSize: 36,
            color: '#475569',
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          バラバラなエクセルの住所表記を瞬時に「一括統一」。<br/>
          完全無料・ブラウザ内処理で顧客データも安全。
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}
