import { ShieldCheck, Database, Zap } from "lucide-react"

export function ArchitectureSection() {
  return (
    <section className="mt-12 mx-auto max-w-5xl px-4 sm:px-6 scroll-mt-32" id="security">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-card p-8 sm:p-12 shadow-sm relative overflow-hidden">
        {/* 背景の装飾 */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />
        
        <div className="text-center mb-10 relative z-10">
          <div className="inline-flex items-center justify-center rounded-full bg-brand/10 p-2 mb-4 text-brand">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            機密データを守る「ゼロ・リテンション」設計
          </h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
            当システムはお客様の顧客データをサーバーに一切保存しません。金融機関や不動産など、厳格なセキュリティ要件が求められるエンタープライズ企業でも安心して導入いただけます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
          {/* 左側：図解イメージ */}
          <div className="rounded-2xl border border-border/50 bg-background/50 p-6 backdrop-blur-sm">
            <div className="space-y-4">
              {/* Client */}
              <div className="flex items-center gap-4">
                <div className="flex-1 rounded-xl bg-card border border-border p-3 text-center text-sm font-semibold text-foreground shadow-sm">
                  お客様の環境 (ブラウザ / 自社システム)
                </div>
              </div>
              {/* Arrow */}
              <div className="flex justify-center text-muted-foreground text-xs font-mono">
                ↓ 住所データ送信 (HTTPS暗号化)
              </div>
              {/* Server Processing Area */}
              <div className="relative rounded-xl border-2 border-dashed border-brand/40 bg-brand/5 p-5 text-center">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-surface px-2 text-xs font-bold text-brand">
                  メモリ上の揮発処理エリア
                </div>
                <div className="flex justify-center gap-2 mb-3 mt-1">
                  <div className="flex items-center gap-1 rounded bg-background px-2 py-1.5 text-xs text-foreground shadow-sm border border-border">
                    <Zap className="h-3.5 w-3.5 text-brand" /> 高速API認証
                  </div>
                  <div className="flex items-center gap-1 rounded bg-background px-2 py-1.5 text-xs text-foreground shadow-sm border border-border">
                    正規化エンジン
                  </div>
                </div>
                <p className="text-[11px] font-bold text-brand mt-2 bg-brand/10 py-1 rounded">※処理完了後、瞬時にメモリから完全破棄</p>
              </div>
              {/* Arrow */}
              <div className="flex justify-center text-muted-foreground text-xs font-mono">
                ↓ 処理件数(数値)のみ送信 / 住所は保存しない
              </div>
              {/* DB */}
              <div className="flex items-center gap-4">
                <div className="flex-1 rounded-xl bg-card border border-border p-3 flex items-center justify-center gap-2 text-sm font-semibold text-foreground shadow-sm opacity-60">
                  <Database className="h-4 w-4" /> データベース (Supabase)
                </div>
              </div>
            </div>
          </div>

          {/* 右側：3つのポイント */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand font-bold">1</div>
              <div>
                <h3 className="font-bold text-foreground">住所データは「その場」で破棄</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  送信されたデータは、正規化処理のために一時的にメモリ上に展開され、結果を返却した瞬間に完全に破棄されます。ストレージへの記録は一切行いません。
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand font-bold">2</div>
              <div>
                <h3 className="font-bold text-foreground">保存するのは「数値」だけ</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  システムの不正利用防止や制限枠の管理のためにデータベースに記録されるのは、「いつ」「何件処理したか」というメタデータ（数値ログ）のみです。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand font-bold">3</div>
              <div>
                <h3 className="font-bold text-foreground">すべての通信を暗号化保護</h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  お客様の環境から当システムまでの通信は、最新のTLS（SSL）暗号化技術によって強固に保護されており、経路での傍受や改ざんを防ぎます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
