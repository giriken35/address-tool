import { BotOff, ShieldAlert, Zap, AlertTriangle } from "lucide-react"

export function AiComparisonSection() {
  return (
    <section className="mt-24 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-12 shadow-sm">
        {/* 背景の装飾 */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-rose-500/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />

        <div className="relative text-center mb-12">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-500 ring-1 ring-rose-500/20">
            <BotOff className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            「流行りの生成AIに任せればいいのでは？」<br className="sm:hidden" />への明確な答え
          </h2>
          <p className="mt-4 text-muted-foreground text-sm sm:text-base max-w-2xl mx-auto">
            生成AIが進化する現代において、あえて「専用アルゴリズム」を使うべき決定的な理由があります。顧客リストなどの重要データをLLM（大規模言語モデル）に投げることには、以下の大きなリスクが伴います。
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 relative">
          {/* Card 1 */}
          <div className="group relative rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-rose-500/30 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-500">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">機密情報の漏洩リスク</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              顧客の「住所・氏名」などの個人情報を生成AIのプロンプトに入力すると、AIの学習データとして吸収されるリスクがあり、企業のコンプライアンス違反に直結します。<br/>
              <strong className="text-foreground mt-2 block">当ツールなら：完全にブラウザ内処理（ゼロ・リテンション）で安全。</strong>
            </p>
          </div>

          {/* Card 2 */}
          <div className="group relative rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-amber-500/30 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">データの欠損（嘘）</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              LLMに数千件のデータを処理させると、「ランダムに数行スキップされる」「存在しない架空の郵便番号をでっち上げる（ハルシネーション）」といった致命的なエラーが高確率で発生します。<br/>
              <strong className="text-foreground mt-2 block">当ツールなら：確定的なアルゴリズムにより、1件も漏らさず100%正確に処理。</strong>
            </p>
          </div>

          {/* Card 3 */}
          <div className="group relative rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:border-brand/30 hover:shadow-md">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="mb-2 font-bold text-foreground">速度とAPIコスト</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              AIに大量の住所を処理させると非常に時間がかかり、従量課金のAPIトークン代も膨大になります。<br/>
              <strong className="text-foreground mt-2 block">当ツールなら：1万件の処理もわずか数秒で完了し、定額（または無料）で利用できます。</strong>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
