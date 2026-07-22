import { ShieldCheck, Zap, GitCompareArrows, MoonStar } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Feature {
  icon: LucideIcon
  title: string
  desc: string
  tone: "brand" | "teal"
}

const FEATURES: Feature[] = [
  {
    icon: ShieldCheck,
    title: "サーバー保存なし",
    desc: "データはブラウザのメモリ内でのみ処理",
    tone: "teal",
  },
  {
    icon: Zap,
    title: "ワンクリック処理",
    desc: "数千件も瞬時に一括正規化",
    tone: "brand",
  },
  {
    icon: GitCompareArrows,
    title: "差分プレビュー付き",
    desc: "変更前後をその場で確認",
    tone: "brand",
  },
  {
    icon: MoonStar,
    title: "ダークモード設計",
    desc: "目にやさしい近未来 UI",
    tone: "teal",
  },
]

export function FeatureBadges() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {FEATURES.map(({ icon: Icon, title, desc, tone }) => (
        <div
          key={title}
          className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_12px_40px_-12px_rgba(108,99,255,0.4)]"
        >
          <div
            className={`mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl ${
              tone === "teal"
                ? "bg-brand-2/12 text-brand-2"
                : "bg-brand/12 text-brand"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{desc}</p>
          <div
            className={`pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full blur-2xl transition-opacity duration-300 group-hover:opacity-100 ${
              tone === "teal" ? "bg-brand-2/20 opacity-0" : "bg-brand/20 opacity-0"
            }`}
          />
        </div>
      ))}
    </div>
  )
}
