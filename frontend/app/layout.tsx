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
  title: '住所データ自動整形ツール | 住所表記揺れを瞬時に一括正規化',
  description:
    '面倒なエクセルの住所表記揺れを数秒で一括統一。緯度経度の抽出にも対応した完全無料の正規化ツール。',
  keywords: [
    '住所',
    '表記揺れ',
    '一括変換',
    '正規化',
    'CSV',
    '無料',
    '統一',
    '名寄せ',
    'ジオコーディング',
  ],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://address-tool-qpli.vercel.app',
    siteName: '住所データ自動整形ツール',
    title: '住所データ自動整形ツール | 住所表記揺れを瞬時に一括正規化',
    description: '面倒なエクセルの住所表記揺れを数秒で一括統一。緯度経度の抽出にも対応した完全無料のツール。',
  },
  twitter: {
    card: 'summary_large_image',
    title: '住所データ自動整形ツール | 住所表記揺れを瞬時に一括正規化',
    description: '面倒なエクセルの住所表記揺れを数秒で一括統一。完全無料で登録不要！',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0f1117',
  userScalable: true,
}

import { Header } from '@/components/header'
import { Toaster } from 'sonner'
import { BackToTop } from '@/components/back-to-top'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className="bg-background">
      <body className={`${notoSansJP.variable} ${geistMono.variable} font-sans antialiased`}>
        <div className="ambient-bg" aria-hidden="true" />
        <Header />
        {children}
        <BackToTop />
        <Toaster position="top-center" richColors />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
