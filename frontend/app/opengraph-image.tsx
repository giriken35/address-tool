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
          background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '80px 100px',
          position: 'relative',
        }}
      >
        {/* 背景の装飾（サイトと同じアンビエントグロー） */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(79,70,229,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-100px', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(13,148,136,0.06) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />

        {/* ロゴ部分 */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          marginBottom: '50px',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '72px',
            height: '72px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
            borderRadius: '20px',
            boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)'
          }}>
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
               <line x1="9" y1="3" x2="9" y2="21"></line>
               <line x1="15" y1="3" x2="15" y2="21"></line>
             </svg>
          </div>
          <span style={{ fontSize: '32px', color: '#64748b', fontWeight: 'bold', letterSpacing: '1px' }}>GIRI-Lab</span>
        </div>

        {/* メインタイトル */}
        <h1
          style={{
            fontSize: '84px',
            fontWeight: '900',
            color: '#0f172a',
            marginBottom: '32px',
            lineHeight: 1.1,
            letterSpacing: '-2px',
          }}
        >
          住所データ<br/>自動整形ツール
        </h1>

        {/* サブタイトル */}
        <p
          style={{
            fontSize: '36px',
            color: '#475569',
            maxWidth: '900px',
            lineHeight: 1.5,
            fontWeight: 'bold',
          }}
        >
          エクセルの面倒な住所クレンジングを数秒で完了。<br/>
          表記揺れの一括統一から、緯度経度の抽出まで。
        </p>

        {/* 下部のバッジ */}
        <div style={{ display: 'flex', gap: '16px', marginTop: '60px' }}>
          <div style={{ background: 'rgba(79,70,229,0.05)', border: '2px solid rgba(79,70,229,0.2)', color: '#4f46e5', padding: '12px 24px', borderRadius: '100px', fontSize: '24px', fontWeight: 'bold' }}>完全無料</div>
          <div style={{ background: 'rgba(15,23,42,0.03)', border: '2px solid rgba(15,23,42,0.1)', color: '#334155', padding: '12px 24px', borderRadius: '100px', fontSize: '24px', fontWeight: 'bold' }}>登録不要</div>
          <div style={{ background: 'rgba(15,23,42,0.03)', border: '2px solid rgba(15,23,42,0.1)', color: '#334155', padding: '12px 24px', borderRadius: '100px', fontSize: '24px', fontWeight: 'bold' }}>API連携対応</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
