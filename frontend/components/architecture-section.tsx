import { ShieldCheck, Database, Zap, Server, ArrowDown, Lock, Trash2 } from "lucide-react"

export function ArchitectureSection() {
  return (
    <section className="mt-12 mx-auto max-w-5xl px-4 sm:px-6 scroll-mt-32" id="security">
      <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-card p-6 sm:p-12 shadow-xl relative overflow-hidden">
        {/* 背景の装飾 */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-brand-2/5 blur-3xl" />
        
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center rounded-full bg-brand/10 p-3 mb-4 text-brand shadow-sm">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight">
            機密データを守る「ゼロ・リテンション」設計
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto font-medium leading-relaxed">
            当システムはお客様の顧客データをサーバーに一切保存しません。金融機関や不動産など、厳格なセキュリティ要件が求められるエンタープライズ企業でも安心して導入いただけます。
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* 左側：図解イメージ（視覚的なインパクトを強化） */}
          <div className="rounded-2xl border border-border bg-background/60 p-6 sm:p-8 backdrop-blur-md flex flex-col items-center shadow-inner relative">
            
            {/* 入力 */}
            <div className="w-full max-w-[280px] rounded-xl bg-gradient-to-r from-card to-surface border border-border p-4 text-center text-sm font-bold text-foreground shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105">
               <Server className="h-5 w-5 text-brand" />
               お客様の環境 (自社システム等)
            </div>

            {/* 矢印 1 (統一されたプロフェッショナルなデザイン) */}
            <div className="flex flex-col items-center my-3">
              <div className="w-[2px] h-6 bg-brand/30"></div>
              <div className="whitespace-nowrap rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold text-foreground shadow-sm flex items-center gap-1.5 z-10">
                <Lock className="h-3 w-3 text-brand" /> HTTPS暗号化通信で送信
              </div>
              <div className="w-[2px] h-6 bg-brand/30"></div>
              {/* CSSを使った完璧な三角形の矢印 */}
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand/30"></div>
            </div>

            {/* 処理（揮発） - 目立たせる */}
            <div className="w-full max-w-[340px] relative rounded-2xl border-2 border-brand/50 bg-gradient-to-b from-brand/10 to-transparent p-6 text-center shadow-[0_0_30px_-5px_rgba(108,99,255,0.25)] mt-2">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-brand text-white px-4 py-1 rounded-full text-xs font-black shadow-md whitespace-nowrap flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 fill-white" /> メモリ上の揮発処理エリア
              </div>
              
              <div className="flex justify-center gap-3 mt-4 mb-5">
                <div className="flex items-center gap-1.5 rounded-lg bg-background/80 backdrop-blur px-3 py-2 text-xs font-bold text-foreground shadow-sm border border-border">
                  <ShieldCheck className="h-4 w-4 text-brand-2" /> 高速API認証
                </div>
                <div className="flex items-center gap-1.5 rounded-lg bg-background/80 backdrop-blur px-3 py-2 text-xs font-bold text-foreground shadow-sm border border-border">
                  <Zap className="h-4 w-4 text-brand-2" /> 正規化処理
                </div>
              </div>

              {/* 破棄のアピールを強烈に */}
              <div className="relative inline-flex items-center justify-center w-full">
                <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
                <div className="relative flex items-center justify-center gap-1.5 text-xs sm:text-sm font-black text-red-600 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 py-2 px-3 rounded-lg shadow-sm w-full">
                  <Trash2 className="h-4 w-4" />
                  処理後、瞬時にメモリから完全破棄
                </div>
              </div>
            </div>

            {/* 矢印 2 (上の矢印と完全に統一されたデザイン) */}
            <div className="flex flex-col items-center my-3">
              <div className="w-[2px] h-6 bg-brand/30"></div>
              <div className="whitespace-nowrap rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold text-muted-foreground shadow-sm z-10">
                処理件数(ログ)のみ記録
              </div>
              <div className="w-[2px] h-6 bg-brand/30"></div>
              <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-brand/30"></div>
            </div>

            {/* 出力/DB (上部のボックスと統一したデザイン) */}
            <div className="w-full max-w-[280px] rounded-xl bg-gradient-to-r from-surface to-card border border-border p-4 flex items-center justify-center gap-2 text-sm font-bold text-foreground shadow-md transition-transform hover:scale-105">
              <Database className="h-5 w-5 text-muted-foreground" /> データベース (Supabase)
            </div>

          </div>

          {/* 右側：3つのポイント */}
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand font-black text-lg shadow-sm border border-brand/20">1</div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">住所データは「その場」で破棄</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-medium">
                  送信されたデータは、正規化処理のために一時的にメモリ上に展開され、結果を返却した瞬間に完全に破棄されます。ストレージへの記録は一切行いません。
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand font-black text-lg shadow-sm border border-brand/20">2</div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">保存するのは「数値」だけ</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-medium">
                  システムの不正利用防止や制限枠の管理のためにデータベースに記録されるのは、「いつ」「何件処理したか」というメタデータ（数値ログ）のみです。
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand font-black text-lg shadow-sm border border-brand/20">3</div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-foreground">すべての通信を暗号化保護</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed font-medium">
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
