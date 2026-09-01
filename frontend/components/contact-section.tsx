import { Mail } from "lucide-react"

export function ContactSection() {
  return (
    <section id="contact" className="mt-20 mx-auto max-w-2xl px-4 sm:px-6 pb-20 scroll-mt-32">
      <div className="overflow-hidden rounded-3xl border border-border bg-card/60 p-8 backdrop-blur-sm sm:p-12 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg">
            <Mail className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">お問い合わせ</h2>
          <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground text-balance">
            プロプラン（API）のご利用相談や、ツールに関するご質問などがございましたら、以下のフォームよりお気軽にお問い合わせください。
          </p>
        </div>

        <div className="rounded-2xl border border-brand/20 bg-brand/5 p-8 text-center flex flex-col items-center justify-center">
          <a 
            href="https://forms.gle/eGDqyKDbSsDDnnoc6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full sm:w-auto items-center justify-center rounded-xl bg-brand px-8 py-4 text-sm sm:text-base font-bold text-white shadow-md transition-all hover:bg-brand/90 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
          >
            お問い合わせフォームを開く（外部サイト）
          </a>
          <div className="mt-5 text-xs sm:text-sm text-muted-foreground text-left sm:text-center space-y-1">
            <p>※クリックするとGoogleフォームが別タブで開きます。</p>
            <p>※お問い合わせへのご返信は、担当より『info@azorb.co』からお送りいたします。</p>
          </div>
        </div>

        <div className="mt-8 space-y-4 rounded-2xl border border-border bg-surface p-6">
          <h3 className="font-semibold text-foreground">よくあるお問い合わせ例</h3>
          <ul className="space-y-3 text-sm sm:text-base text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2"></span>
              APIの仕様や自社システム（CRM等）への組み込みについて
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2"></span>
              プロプランの法人契約や請求書払いについて
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-2"></span>
              特殊なフォーマットのCSVデータの正規化について
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
