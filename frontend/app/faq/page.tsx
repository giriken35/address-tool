import { HelpCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { FaqAccordion } from "@/components/faq-accordion"

export default function FaqPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-brand transition-colors">
        <ArrowLeft className="h-4 w-4" />
        トップページに戻る
      </Link>

      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg">
            <HelpCircle className="h-8 w-8" />
          </div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">よくあるご質問 (FAQ)</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-balance">
            当サービスのご利用に関するよくある質問をまとめました。
          </p>
        </div>

        <FaqAccordion />

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            上記以外の質問については、
            <Link href="/contact" className="text-brand font-semibold hover:underline">
              お問い合わせページ
            </Link>
            よりお気軽にご相談ください。
          </p>
        </div>
      </div>
    </main>
  )
}
