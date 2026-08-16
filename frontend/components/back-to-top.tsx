"use client"

import { useEffect, useState } from "react"
import { ChevronUp } from "lucide-react"

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'auto'
    }

    const handleScroll = () => {
      // 400px以上スクロールしたら表示
      if (window.scrollY > 400) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="トップへ戻る"
      className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-brand text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 active:scale-95 sm:bottom-8 sm:right-8 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUp className="h-6 w-6 -mb-0.5" strokeWidth={1.5} />
      <span className="text-[11px] font-bold tracking-wider mt-0.5">TOP</span>
    </button>
  )
}
