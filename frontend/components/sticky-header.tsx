"use client"

import { useEffect, useState } from "react"
import { Map, ArrowUp } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/utils/supabase/client"
import { User } from "@supabase/supabase-js"

export function StickyHeader() {
  const [isVisible, setIsVisible] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // ブラウザのリロード時にスクロール位置を保持せず、一番上からスタートさせる
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    window.scrollTo(0, 0)

    // スクロール検知
    const handleScroll = () => {
      // ヒーローエリア（約400px）を超えたら表示
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // ユーザー状態の取得
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user)
    })
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-50 flex justify-center px-4 transition-all duration-300 ${
        isVisible ? "translate-y-4 opacity-100" : "-translate-y-full opacity-0"
      }`}
    >
      <div className="flex w-full max-w-5xl items-center justify-between rounded-2xl border border-border/40 bg-surface/40 px-4 py-3 shadow-lg backdrop-blur-xl">
        
        {/* 左側：ロゴとタイトル */}
        <div 
          className="flex cursor-pointer items-center gap-2 transition-opacity hover:opacity-80"
          onClick={scrollToTop}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white shadow-sm">
            <Map className="h-4 w-4" />
          </div>
          <span className="hidden text-sm font-bold text-foreground sm:inline-block">
            住所データ自動整形ツール
          </span>
        </div>

        {/* 右側：ボタン群 */}
        <div className="flex items-center gap-3">
          {user ? (
            <Link 
              href="/dashboard" 
              className="hidden text-xs font-semibold text-muted-foreground hover:text-foreground sm:inline-block"
            >
              マイページ
            </Link>
          ) : (
            <Link 
              href="/login" 
              className="hidden text-xs font-semibold text-muted-foreground hover:text-foreground sm:inline-block"
            >
              ログイン
            </Link>
          )}
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full bg-brand px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-brand/90 hover:shadow-lg active:scale-95"
          >
            無料で試す
            <ArrowUp className="h-3 w-3" />
          </button>
        </div>

      </div>
    </div>
  )
}
