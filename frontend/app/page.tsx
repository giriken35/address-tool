import { Map } from "lucide-react"
import Link from "next/link"
import { FeatureBadges } from "@/components/feature-badges"
import { CharacterPanel } from "@/components/character-panel"
import { NormalizerTool } from "@/components/normalizer-tool"
import { ProPlanCard } from "@/components/pro-plan-card"
import { AdSlot, BANNER_HTML } from "@/components/ad-slot"

export default function Page() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      {/* ヒーローヘッダー */}
      <header className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-card to-[#1a2040] px-6 py-8 shadow-2xl sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brand-2/15 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-2" />
              無料・登録不要ですぐに試せる
            </div>
            
            <a href="#pricing" className="text-xs font-semibold text-brand hover:text-brand-2 hover:underline">
              料金プラン / 開発者APIはこちら →
            </a>
          </div>

          <h1 className="flex items-center gap-3 text-2xl font-bold leading-tight text-balance sm:text-4xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg sm:h-14 sm:w-14">
              <Map className="h-6 w-6 sm:h-8 sm:w-8" />
            </span>
            <span className="text-gradient">住所データ自動整形ツール</span>
          </h1>

          <div className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
            <p className="mb-4">
              「１丁目２番地」と「1-2」の混在など、エクセルでの面倒な目視チェックはもう不要。<br className="hidden sm:block" />
              CSVをドロップするだけで、表記揺れのひどい顧客データを瞬時に美しく整えます。
            </p>
            <ul className="space-y-1.5 text-sm text-foreground/80 font-medium">
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand"></span>
                抜けている「都道府県」を自動で判別・補完
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand"></span>
                全角/半角、種類が違うハイフンのズレを一括修正
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1 w-1 rounded-full bg-brand"></span>
                名寄せやDM発送における業務工数を劇的に削減
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <FeatureBadges />
          </div>
        </div>
      </header>

      {/* 3カラムレイアウト */}
      <div className="flex items-start gap-6">
        <aside className="hidden w-[300px] shrink-0 xl:block">
          <CharacterPanel side="left" name="ナビ子" role="正規化アシスタント" />
        </aside>

        <div className="min-w-0 flex-1">
          <NormalizerTool />
        </div>

        <aside className="hidden w-[300px] shrink-0 xl:block">
          <CharacterPanel side="right" name="マップ君" role="住所チェッカー" />
        </aside>
      </div>

      {/* 料金プラン（さりげない説明） */}
      <section id="pricing" className="mt-12 mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm sm:p-10">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">料金プラン / 開発者API</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            個人利用や小規模なデータ整理は、ずっと無料でお使いいただけます。
          </p>
        </div>
        
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Free Plan */}
          <div className="relative rounded-2xl border border-border bg-surface p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Free</h3>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold">¥0</span>
                <span className="text-xs text-muted-foreground">/ ずっと</span>
              </p>
            </div>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                1回あたり <strong className="text-foreground">最大100件</strong> まで処理可能
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                ブラウザ上のCSV変換ツール
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand"></span>
                登録不要ですぐに利用可能
              </li>
            </ul>
          </div>
          
          {/* Pro Plan */}
          <ProPlanCard />
        </div>
      </section>

      {/* 下部広告バナー（名刺印刷 / A8.net） */}
      <div className="mt-10 flex flex-col items-center">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Sponsored
        </p>
        <div className="overflow-hidden rounded-2xl border border-border bg-card/50 p-3 backdrop-blur-sm">
          <AdSlot html={BANNER_HTML} width={300} height={250} title="名刺印刷 広告バナー" />
        </div>
      </div>

      {/* フッター */}
      <footer className="mt-10 border-t border-border pt-6 text-center text-xs leading-relaxed text-muted-foreground">
        <div className="mb-4 flex justify-center gap-6">
          <Link href="/contact" className="hover:text-brand transition-colors">お問い合わせ</Link>
          {/* 今後「利用規約」や「特定商取引法に基づく表記」などを増やす場合はここに追加します */}
        </div>
        <p>
          住所表記揺れ 一括正規化ツール　|　
          データは正規化処理のため安全にAPIへ送信されますが、一切保存されません。
        </p>
        <p className="mt-1 text-[10px] opacity-70">
          ※本サービスは、デジタル庁の「アドレス・ベース・レジストリ」および国土地理院のオープンデータを利用しています。
        </p>
        <p className="mt-3">Built with Next.js &amp; Tailwind CSS</p>
      </footer>
    </main>
  )
}

