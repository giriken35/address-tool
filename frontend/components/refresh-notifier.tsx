"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function RefreshNotifier() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // Navigation APIを利用して「リロード（F5）によるアクセスか」を判定
    const navEntries = performance.getEntriesByType("navigation")
    if (navEntries.length > 0 && (navEntries[0] as PerformanceNavigationTiming).type === "reload") {
      // リロード時のみ、くるくるマークを表示
      setIsRefreshing(true)

      // 視覚的に「更新している感」を出すために少し待機してからメッセージ表示
      const timer = setTimeout(() => {
        setIsRefreshing(false)
        toast.success("ページを更新しました")
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [])

  // 更新中でなければ何も表示しない
  if (!isRefreshing) return null

  // 更新中用のフルスクリーンスピナー
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/50 backdrop-blur-sm transition-opacity duration-300">
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-card border border-border px-10 py-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <Loader2 className="h-10 w-10 animate-spin text-brand" />
        <p className="text-sm font-bold text-foreground tracking-wider">更新中...</p>
      </div>
    </div>
  )
}
