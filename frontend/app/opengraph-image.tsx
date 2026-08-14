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
          backgroundColor: '#f1f5f9',
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          padding: '40px',
        }}
      >
        {/* 中央のフローティングカード */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ffffff',
          borderRadius: '32px',
          padding: '60px 80px',
          width: '100%',
          height: '100%',
          boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.15), 0 0 0 1px rgba(15, 23, 42, 0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* 左上の装飾グラデーション */}
          <div style={{ position: 'absolute', top: '-150px', left: '-150px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(79,70,229,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', bottom: '-150px', right: '-150px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(13,148,136,0.1) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%' }} />

          {/* ロゴアイコン */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '96px',
            height: '96px',
            background: 'linear-gradient(135deg, #4f46e5 0%, #0d9488 100%)',
            borderRadius: '24px',
            boxShadow: '0 15px 35px -5px rgba(79, 70, 229, 0.4)',
            marginBottom: '40px',
          }}>
             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"></polygon>
               <line x1="9" y1="3" x2="9" y2="21"></line>
               <line x1="15" y1="3" x2="15" y2="21"></line>
             </svg>
          </div>

          {/* メインタイトル */}
          <h1
            style={{
              fontSize: '76px',
              fontWeight: '900',
              color: '#0f172a',
              marginBottom: '24px',
              lineHeight: 1.1,
              letterSpacing: '-2px',
              textAlign: 'center',
            }}
          >
            住所データ自動整形ツール
          </h1>

          {/* サブタイトル */}
          <p
            style={{
              fontSize: '32px',
              color: '#64748b',
              textAlign: 'center',
              lineHeight: 1.6,
              fontWeight: 'bold',
            }}
          >
            エクセルの面倒な住所クレンジングを数秒で完了。<br/>
            表記揺れの一括統一から、緯度経度の抽出まで。
          </p>

          {/* バッジ */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '48px' }}>
            <div style={{ background: '#eef2ff', color: '#4f46e5', padding: '12px 28px', borderRadius: '100px', fontSize: '22px', fontWeight: 'bold' }}>完全無料</div>
            <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', color: '#475569', padding: '12px 28px', borderRadius: '100px', fontSize: '22px', fontWeight: 'bold' }}>登録不要</div>
            <div style={{ background: '#f8fafc', border: '2px solid #e2e8f0', color: '#475569', padding: '12px 28px', borderRadius: '100px', fontSize: '22px', fontWeight: 'bold' }}>API連携対応</div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
