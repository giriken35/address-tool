"use client"

import { useState } from "react"
import { Loader2 } from "lucide-react"

export function UpgradeButton({ className, children }: { className?: string, children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)

  const handleUpgrade = async () => {
    if (loading) return
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', { method: 'POST' })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert('Stripe決済エラー: ' + (data.error || '設定を確認してください'))
        setLoading(false)
      }
    } catch (e) {
      alert('エラーが発生しました')
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleUpgrade} 
      disabled={loading} 
      className={`${className} flex items-center justify-center`}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
      {children}
    </button>
  )
}
