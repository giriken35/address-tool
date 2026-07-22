import { Map } from "lucide-react"
import { FeatureBadges } from "@/components/feature-badges"
import { CharacterPanel } from "@/components/character-panel"
import { NormalizerTool } from "@/components/normalizer-tool"
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
            
            <a href="#pro-plan" onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }} className="text-xs font-semibold text-brand hover:text-brand-2 hover:underline">
              料金プラン / 開発者APIはこちら →
            </a>
          </div>

          <h1 className="flex items-center gap-3 text-2xl font-bold leading-tight text-balance sm:text-4xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg sm:h-14 sm:w-14">
              <Map className="h-6 w-6 sm:h-8 sm:w-8" />
            </span>
            <span className="text-gradient">住所表記揺れ 一括正規化ツール</span>
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
            CSVをアップロードするだけ — 都道府県・全角半角・番地ハイフンの表記揺れを瞬時に統一。
            発送業務や顧客データの管理を効率化します。
          </p>

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
