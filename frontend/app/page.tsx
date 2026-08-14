import { Map, DatabaseZap, Terminal } from "lucide-react"
import Link from "next/link"
import { FeatureBadges } from "@/components/feature-badges"
import { NormalizerTool } from "@/components/normalizer-tool"
import { UseCases } from "@/components/use-cases"
import { ProPlanCard } from "@/components/pro-plan-card"
import { StickyHeader } from "@/components/sticky-header"
import { ArchitectureSection } from "@/components/architecture-section"
import { ComparisonSection } from "@/components/comparison-section"
import { AiComparisonSection } from "@/components/ai-comparison-section"
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  return (
    <>
      <StickyHeader />
      <main className="mx-auto min-h-screen w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      {/* ヒーローヘッダー */}
      <header className="relative mb-6 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-surface via-card to-[#1a2040] px-6 py-8 shadow-2xl sm:px-10 sm:py-10">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-brand/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-brand-2/15 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-3 py-1.5 text-xs font-bold text-brand shadow-[0_0_15px_-3px_rgba(108,99,255,0.3)] backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
              </span>
              無料・登録不要
            </div>
            <div className="flex items-center gap-4">
              <a href="#pricing" className="text-xs font-semibold text-brand hover:text-brand-2 hover:underline hidden sm:inline-block">
                料金プラン / 開発者API
              </a>
              {user ? (
                <Link href="/dashboard" className="text-xs font-bold bg-brand text-white px-4 py-1.5 rounded-full shadow-sm hover:bg-brand/90 transition-colors">
                  マイページへ
                </Link>
              ) : (
                <Link href="/login" className="text-xs font-bold bg-brand text-white px-4 py-1.5 rounded-full shadow-sm hover:bg-brand/90 transition-colors">
                  ログイン / 登録
                </Link>
              )}
            </div>
          </div>

          <h1 className="flex items-center gap-3 text-2xl font-bold leading-tight text-balance sm:text-4xl">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg sm:h-14 sm:w-14">
              <Map className="h-6 w-6 sm:h-8 sm:w-8" />
            </span>
            <span className="text-gradient">住所データ自動整形ツール</span>
          </h1>

          <div className="mt-4 max-w-2xl">
            <ul className="space-y-2.5 text-sm text-foreground/80 sm:text-base font-medium">
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
                <span>目視で何時間もかかっていたエクセルの表記揺れチェックを、ドロップ<strong>数秒で完了</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
                <span>「１丁目２番地」や「1-2」など、担当者によってバラバラな入力フォーマットを<strong>完全統一</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
                <span>「港区」「新宿区」など、市区町村から始まって抜けている「都道府県」を<strong>自動で補完</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
                <span>全角/半角の「1」や、種類が違うハイフン（ー、-、—）などの細かなズレも<strong>一括で補正</strong></span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand"></span>
                <span>住所から「緯度・経度」を<strong>自動抽出</strong>し、Tableauや地図アプリ用の空間データに<strong>一瞬で変換</strong></span>
              </li>
            </ul>
          </div>

          <div className="mt-6">
            <FeatureBadges />
          </div>
        </div>
      </header>

      <div id="tool-section" className="mx-auto max-w-5xl scroll-mt-32">
        <NormalizerTool />
      </div>

      {/* ユースケース */}
      <UseCases />

      {/* セキュリティ・アーキテクチャ */}
      <ArchitectureSection />

      {/* 生成AI（ChatGPTなど）との違い */}
      <AiComparisonSection />

      {/* 競合比較 */}
      <ComparisonSection />

      {/* 料金プラン（さりげない説明） */}
      <section id="pricing" className="mt-20 mx-auto max-w-4xl overflow-hidden rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-sm sm:p-10">
        <div className="text-center">
          <h2 className="text-xl font-bold text-foreground sm:text-2xl">料金プラン / 開発者API</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            個人利用や小規模なデータ整理は、ずっと無料でお使いいただけます。
          </p>
        </div>
        
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Free Plan */}
          <div className="relative flex flex-col rounded-2xl border border-border bg-surface p-6">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-foreground">Free</h3>
              <p className="mt-2 flex items-baseline gap-2">
                <span className="text-3xl font-bold">¥0</span>
                <span className="text-xs text-muted-foreground">/ ずっと</span>
              </p>
            </div>
            <ul className="mb-8 space-y-3 text-sm text-muted-foreground">
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
            <div className="mt-auto">
              <a href="#tool-section" className="flex w-full items-center justify-center rounded-xl border border-brand bg-brand/5 px-4 py-2.5 text-sm font-semibold text-brand transition-colors hover:bg-brand/10">
                ページ上部で今すぐ試す（無料）
              </a>
            </div>
          </div>
          
          {/* Pro Plan */}
          <ProPlanCard />
        </div>
      </section>

      {/* SEO Section */}
      <section className="mt-20 mx-auto max-w-5xl px-4 sm:px-6 pb-8">
        <div className="rounded-2xl border border-border bg-surface/40 p-6 sm:p-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-8 text-center">
            なぜエクセルの住所正規化や「緯度・経度」の変換（ジオコーディング）が必要なのか？
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            
            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_4px_20px_-4px_rgba(14,165,233,0.15)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10 text-brand">
                <DatabaseZap className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-bold text-foreground text-sm">重複・配送エラーの防止</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                「1丁目2番地」と「1-2」といった<strong>住所の表記揺れ</strong>は、名寄せ時の重複登録やDMの配送エラーの大きな原因に。無料で一括変換し、クリーンなデータ基盤を保ちます。
              </p>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand/20 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-brand-2/30 hover:shadow-[0_4px_20px_-4px_rgba(34,197,94,0.15)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-2/10 text-brand-2">
                <Map className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-bold text-foreground text-sm">瞬時の商圏分析（ジオコーディング）</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                正規化と同時に<strong>「緯度・経度」を自動抽出</strong>。TableauやGoogleマイマップなどの地図アプリに取り込むことで、エリアマーケティングや商圏分析がすぐに行えます。
              </p>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-brand-2/20 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_4px_20px_-4px_rgba(59,130,246,0.15)]">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600">
                <Terminal className="h-5 w-5" />
              </div>
              <h3 className="mb-2 font-bold text-foreground text-sm">自社システムへの組み込み</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                専用の開発者向けAPIを活用し、自社のCRMやSFAシステムに直接連携。入力された住所データをリアルタイムで正規化・空間データ化します。
              </p>
              <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
            </div>

          </div>
        </div>
      </section>
      {/* フッター */}
      <footer className="mt-10 border-t border-border pt-6 text-center text-xs leading-relaxed text-muted-foreground">
        <div className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/terms" className="hover:text-brand transition-colors">利用規約</Link>
          <Link href="/privacy" className="hover:text-brand transition-colors">プライバシーポリシー</Link>
          <Link href="/legal" className="hover:text-brand transition-colors">特定商取引法に基づく表記</Link>
          <Link href="/faq" className="hover:text-brand transition-colors">よくある質問 (FAQ)</Link>
          <Link href="/contact" className="hover:text-brand transition-colors">お問い合わせ</Link>
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
    </>
  )
}

