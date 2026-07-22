"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

export function ProPlanCard() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.open(data.url, '_blank')
        setLoading(false)
      } else {
        alert('Stripeの決済設定がまだ完了していません。Vercelの環境変数を設定してください。')
        setLoading(false)
      }
    } catch (e) {
      alert('エラーが発生しました')
      setLoading(false)
    }
  }

  return (
    <div 
      onClick={handleUpgrade}
      className={`relative rounded-2xl border-2 border-brand/60 bg-gradient-to-br from-brand/5 to-brand-2/10 p-6 shadow-[0_0_30px_-5px_rgba(108,99,255,0.3)] cursor-pointer transition-all hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(108,99,255,0.5)] sm:scale-105 sm:z-10 ${loading ? 'opacity-80 pointer-events-none' : ''}`}
    >
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-background/50 backdrop-blur-sm">
          <Loader2 className="h-8 w-8 animate-spin text-brand mb-2" />
          <span className="text-sm font-bold text-brand">読み込み中...</span>
        </div>
      )}
      <div className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-brand to-brand-2 px-3 py-1 text-[10px] font-bold text-white shadow-md">
        ビジネス向け
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-brand transition-colors group-hover:text-brand-2">Pro / API</h3>
        <p className="mt-2 flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">¥5,000</span>
          <span className="text-xs text-muted-foreground">/ 月</span>
        </p>
      </div>
      <ul className="space-y-3 text-sm text-muted-foreground">
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-2"></span>
          <strong className="text-foreground">無制限</strong> のCSV一括処理
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-2"></span>
          自社システム連携用 <strong className="text-foreground">正規化API</strong>
        </li>
        <li className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-2"></span>
          メールによる優先テクニカルサポート
        </li>
      </ul>
      
      <div className="mt-6 flex items-center justify-center rounded-xl bg-brand/10 py-3 text-sm font-bold text-brand transition-colors hover:bg-brand hover:text-white">
        今すぐアップグレードする →
      </div>
    </div>
  )
}
