"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    question: "無料でどこまで使えますか？",
    answer: "1回のご利用につき、最大100件までのCSVデータであれば完全無料で一括クレンジングが可能です。回数制限はありませんので、何度でもお使いいただけます。"
  },
  {
    question: "アップロードした顧客データは保存されますか？",
    answer: "いいえ、アップロードされたCSVデータはすべてお客様のブラウザ内（ご使用のPC上）でのみ処理されます。当社のサーバーには一切送信・保存されないため、機密情報を含むデータでも安心してご利用いただけます。"
  },
  {
    question: "どのような表記揺れに対応していますか？",
    answer: "欠落した「都道府県」の自動判別・補完をはじめ、全角・半角の違い（例：１と1）、様々な種類のハイフン（ー、-、—など）の統一、丁目・番地表記のフォーマット統一など、日本の住所データによくある不揃いを自動で美しく整えます。"
  },
  {
    question: "プロプラン（有料版）にすると何が変わりますか？",
    answer: "100件という上限がなくなり、数万件規模のデータを一度に処理できるようになります。さらに、自社のデータベースやシステムに直接組み込める「開発者向けAPI」の利用が可能になり、業務工数を劇的に削減できます。"
  },
  {
    question: "「UTF-8 / Shift-JISのCSVに対応」とはどういう意味ですか？（確認方法は？）",
    answer: "文字化けを防ぐための「ファイルの保存形式（文字コード）」のことです。日本で一般的に使われる両方の形式に自動で対応しているため、基本的にはそのままアップロードして問題ありません。\n【確認方法】Windowsの「メモ帳」でCSVファイルを開き、右下に「UTF-8」または「ANSI（Shift-JISのこと）」と表示されていれば対応しています。エクセルで保存する場合は「CSV（コンマ区切り）」または「CSV（UTF-8（コンマ区切り））」を選んで保存してください。"
  },
  {
    question: "プロプランの解約はいつでも可能ですか？",
    answer: "はい、いつでも解約可能です。契約期間の縛りはなく、解約手続き後も次回の更新日までは引き続きプロプランの全機能をご利用いただけます。"
  }
]

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="mx-auto mt-8 max-w-3xl space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index
        return (
          <div 
            key={index} 
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-brand/40 bg-brand/5 shadow-sm" : "border-border bg-card hover:bg-muted/50"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-foreground focus:outline-none"
            >
              <span className="text-[15px] sm:text-base">{faq.question}</span>
              <span className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isOpen ? "bg-brand text-white" : "bg-muted text-muted-foreground"}`}>
                {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              </span>
            </button>
            <div 
              className={`grid transition-all duration-300 ease-in-out ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="whitespace-pre-wrap px-6 pb-6 pt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {faq.answer}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
