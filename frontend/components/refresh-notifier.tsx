"use client"

import { useEffect } from "react"
import { toast } from "sonner"

export function RefreshNotifier() {
  useEffect(() => {
    if (typeof window === "undefined") return

    // Navigation APIを利用して「リロード（F5）によるアクセスか」を判定
    const navEntries = performance.getEntriesByType("navigation")
    if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") {
      // リロード完了時、ネイティブ機能で更新された後にトーストだけを表示
      toast.success("ページを更新しました", {
        position: "top-center",
        duration: 2000,
        style: { padding: '8px 24px', minHeight: '36px', fontSize: '14px', borderRadius: '100px', width: 'max-content', margin: '0 auto', left: 0, right: 0 }
      })
    }
  }, [])

  return null
}
