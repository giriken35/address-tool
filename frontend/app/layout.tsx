import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Noto_Sans_JP, Geist_Mono } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-jp',
  display: 'swap',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: '住所表記揺れ 一括正規化ツール | CSVの住所統一を無料変換',
  description:
    'CSVの住所データの表記揺れを一括で正規化・統一する無料ツールです。都道府県・全角半角・番地ハイフンを瞬時に統一し、発送業務や顧客管理を効率化します。データはブラウザ内で処理されサーバーに保存されません。',
  keywords: [
    '住所',
    '表記揺れ',
    '一括変換',
    '正規化',
    'CSV',
    '無料',
    '統一',
    '発送業務',
    '効率化',
  ],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f1117',
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="dark bg-background">
      <body className={`${notoSansJP.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="ambient-bg" aria-hidden="true" />
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
