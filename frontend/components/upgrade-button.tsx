"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export function UpgradeButton() {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Stripeの決済設定がまだ完了していません。Vercelの環境変数を設定してください。')
      }
    } catch (e) {
      alert('エラーが発生しました')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleUpgrade}
      disabled={loading}
      className="mt-6 w-full bg-gradient-to-r from-brand to-[#8b85ff] text-white shadow-[0_6px_24px_-6px_rgba(108,99,255,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-6px_rgba(108,99,255,0.8)]"
    >
      {loading ? "読み込み中..." : "Proプランにアップグレード"}
    </Button>
  )
}
