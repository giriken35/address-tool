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
    question: "決済の対象期間（有効期限）はどうなっていますか？",
    answer: (
      <div className="space-y-4">
        <p>Proプランは月額課金となり、お支払いを完了した日から起算して「1ヶ月間」が対象期間となります。以降は解約されるまで、1ヶ月ごとに自動更新となります。</p>
        <div className="bg-background rounded-xl p-4 border border-border/50 shadow-inner">
          <p className="text-xs font-bold mb-3 text-foreground">【ご請求スケジュールの例】</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-medium">
            <div className="bg-brand/10 text-brand px-3 py-2 rounded-lg text-center w-full sm:w-auto border border-brand/20">8月15日<br/>初回決済</div>
            <div className="text-brand/40 hidden sm:block">━━━━</div>
            <div className="text-brand/40 sm:hidden">▼</div>
            <div className="bg-brand/10 text-brand px-3 py-2 rounded-lg text-center w-full sm:w-auto border border-brand/20">9月15日<br/>自動更新</div>
            <div className="text-brand/40 hidden sm:block">━━━━</div>
            <div className="text-brand/40 sm:hidden">▼</div>
            <div className="bg-brand/10 text-brand px-3 py-2 rounded-lg text-center w-full sm:w-auto border border-brand/20">10月15日<br/>自動更新</div>
          </div>
        </div>
        <p className="text-xs opacity-80">※毎月1日に一斉請求されるわけではなく、お客様がご利用を開始した日が基準となりますので、いつ始めても損をすることはありません。</p>
      </div>
    )
  },
  {
    question: "プロプランの解約はいつでも可能ですか？",
    answer: (
      <div className="space-y-4">
        <p>はい、いつでも解約可能です。契約期間の縛りはなく、解約手続き後も次回の更新日までは引き続きプロプランの全機能をご利用いただけます。</p>
        <div className="bg-background rounded-xl p-4 border border-border/50 shadow-inner">
          <p className="text-xs font-bold mb-3 text-foreground">【ご解約スケジュールの例】</p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs font-medium">
            <div className="bg-brand/10 text-brand px-3 py-2 rounded-lg text-center w-full sm:w-auto border border-brand/20">8月15日<br/>初回決済</div>
            <div className="text-brand/40 hidden sm:block">━━━━</div>
            <div className="text-brand/40 sm:hidden">▼</div>
            <div className="bg-red-500/10 text-red-600 px-3 py-2 rounded-lg text-center w-full sm:w-auto border border-red-500/20">9月10日<br/>解約手続き</div>
            <div className="text-brand/40 hidden sm:block">━━━━</div>
            <div className="text-brand/40 sm:hidden">▼</div>
            <div className="bg-muted text-muted-foreground px-3 py-2 rounded-lg text-center w-full sm:w-auto border border-border">9月15日まで<br/>利用可能</div>
          </div>
        </div>
        <p className="text-xs opacity-80">※解約した瞬間に使えなくなるわけではなく、お支払い済みの期間（次回更新日の前日）まではそのままご利用いただけます。日割りでの返金はございません。</p>
      </div>
    )
  },
  {
    question: "出力（ダウンロード）したCSVデータが文字化けしてしまいます。",
    answer: "お使いの表計算ソフト（Excelなど）のエンコード設定が原因の可能性があります。当ツールはUTF-8およびShift-JISの双方に対応していますが、Excelで開く際に文字化けする場合は、Excelのメニュー「データ」＞「テキストまたはCSVから」を選択し、元のファイル形式で「UTF-8」を指定してデータをインポートしてください。"
  },
  {
    question: "CSVファイルのアップロード時にエラーが発生します。データの制限はありますか？",
    answer: "一度に処理できる最大ファイルサイズは10MBまでとなります。また、アップロード前に、1行目のヘッダー（項目名）の並びが指定通りになっているか、データ内に不正な特殊文字が含まれていないかを再度ご確認ください。"
  }
]

export function FaqAccordion() {
  const [openIndices, setOpenIndices] = useState<number[]>([])

  const toggle = (index: number) => {
    setOpenIndices((prev) => 
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    )
  }

  return (
    <div className="mx-auto mt-8 max-w-3xl space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndices.includes(index)
        return (
          <div 
            key={index} 
            className={`overflow-hidden rounded-2xl border transition-colors ${
              isOpen ? "border-brand/40 bg-brand/5 shadow-sm" : "border-border bg-card hover:bg-muted/50"
            }`}
          >
            <button
              onClick={() => toggle(index)}
              className="flex w-full items-center justify-between px-6 py-5 text-left font-bold text-foreground focus:outline-none select-text cursor-pointer"
            >
              <span className="text-[15px] sm:text-base select-text">{faq.question}</span>
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
                <div className="whitespace-pre-wrap px-6 pb-6 pt-1 text-sm leading-relaxed text-muted-foreground sm:text-[15px] select-text">
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
