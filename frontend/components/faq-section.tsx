import { HelpCircle } from "lucide-react"
import { FaqAccordion } from "@/components/faq-accordion"

export function FaqSection() {
  return (
    <section id="faq" className="mt-20 mx-auto max-w-3xl px-4 sm:px-6 pb-8 scroll-mt-32">
      <div className="mb-12 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-lg">
          <HelpCircle className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-bold text-foreground sm:text-3xl">よくあるご質問 (FAQ)</h2>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground text-balance">
          当サービスのご利用に関するよくある質問をまとめました。
        </p>
      </div>

      <FaqAccordion />
    </section>
  )
}
