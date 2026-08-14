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
        toast.success("ページを更新しました", {
          position: "top-center",
          duration: 2000,
          style: { padding: '8px 20px', minHeight: '36px', fontSize: '14px', borderRadius: '100px', width: 'fit-content', minWidth: 'auto' }
        })
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [])

  // 更新中でなければ何も表示しない
  if (!isRefreshing) return null

  // 更新中用のフルスクリーンスピナー
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/40 backdrop-blur-[2px] transition-opacity duration-300">
      <div className="flex items-center gap-3.5 rounded-full bg-card/90 backdrop-blur-md border border-border/50 px-7 py-3.5 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-200">
        <Loader2 className="h-5 w-5 animate-spin text-brand" />
        <p className="text-base font-bold text-foreground tracking-wide">更新中...</p>
      </div>
    </div>
  )
}
