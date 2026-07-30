import { PackageSearch, Mail, Database, MapPin } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface UseCase {
  icon: LucideIcon
  title: string
  desc: string
  colorTheme: "brand" | "brand-2" | "blue" | "amber"
}

const USE_CASES: UseCase[] = [
  {
    icon: PackageSearch,
    title: "ECサイトの配送手配",
    desc: "お客様が入力したバラバラの住所フォーマットを一瞬で統一。配送伝票エラーをなくし、出荷作業をスムーズにします。",
    colorTheme: "brand"
  },
  {
    icon: Mail,
    title: "DM発送・名寄せ",
    desc: "「１丁目２番地」と「1-2」の違いによる重複登録を防止。DMの無駄打ちを減らし、発送コストを削減します。",
    colorTheme: "brand-2"
  },
  {
    icon: Database,
    title: "SFA/CRMのデータ統合",
    desc: "営業管理ツールや顧客データベースに取り込む前にサクッとクレンジング。常に綺麗なデータ基盤を維持できます。",
    colorTheme: "blue"
  },
  {
    icon: MapPin,
    title: "商圏分析・マップ連携",
    desc: "顧客リストをTableau等のBIツールや地図アプリに読み込ませるだけで、日本地図上に一瞬でピンをプロットできます。",
    colorTheme: "amber"
  }
]

export function UseCases() {
  const getColorClasses = (theme: UseCase["colorTheme"]) => {
    switch (theme) {
      case "brand":
        return {
          iconBg: "bg-brand/10 text-brand",
          orb: "bg-brand/20",
          hoverBorder: "cursor-pointer hover:border-brand/50 active:border-brand/50 focus:border-brand/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(79,70,229,0.4)] active:shadow-[0_12px_40px_-12px_rgba(79,70,229,0.4)] focus:shadow-[0_12px_40px_-12px_rgba(79,70,229,0.4)]"
        }
      case "brand-2":
        return {
          iconBg: "bg-brand-2/10 text-brand-2",
          orb: "bg-brand-2/20",
          hoverBorder: "cursor-pointer hover:border-brand-2/50 active:border-brand-2/50 focus:border-brand-2/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(13,148,136,0.4)] active:shadow-[0_12px_40px_-12px_rgba(13,148,136,0.4)] focus:shadow-[0_12px_40px_-12px_rgba(13,148,136,0.4)]"
        }
      case "blue":
        return {
          iconBg: "bg-blue-500/10 text-blue-500",
          orb: "bg-blue-500/20",
          hoverBorder: "cursor-pointer hover:border-blue-500/50 active:border-blue-500/50 focus:border-blue-500/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.4)] active:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.4)] focus:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.4)]"
        }
      case "amber":
        return {
          iconBg: "bg-amber-500/10 text-amber-500",
          orb: "bg-amber-500/20",
          hoverBorder: "cursor-pointer hover:border-amber-500/50 active:border-amber-500/50 focus:border-amber-500/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.4)] active:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.4)] focus:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.4)]"
        }
    }
  }

  return (
    <section className="mt-16 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">こんな業務の効率化に最適です</h2>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {USE_CASES.map(({ icon: Icon, title, desc, colorTheme }) => {
          const colors = getColorClasses(colorTheme)
          return (
            <div
              key={title}
              tabIndex={0}
              className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-6 outline-none transition-all duration-300 hover:-translate-y-1 active:-translate-y-1 focus:-translate-y-1 ${colors.hoverBorder} ${colors.hoverShadow}`}
              onTouchStart={() => {}}
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${colors.iconBg}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-bold text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100 group-active:opacity-100 group-focus:opacity-100 ${colors.orb}`}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}
