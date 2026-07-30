"use client"

import { Upload, ListChecks, Download, FileDown } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { SAMPLE_CSV, downloadCsv } from "@/lib/csv"

interface Step {
  n: string
  icon: LucideIcon
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    n: "01",
    icon: Upload,
    title: "CSVをアップロード",
    desc: "住所データが入ったCSVファイル（UTF-8 / Shift-JIS）をドラッグ＆ドロップ。",
  },
  {
    n: "02",
    icon: ListChecks,
    title: "カラムと処理を選択",
    desc: "住所が入った列を選び、適用したい正規化処理をオン・オフで切り替え。",
  },
  {
    n: "03",
    icon: Download,
    title: "実行してダウンロード",
    desc: "ワンクリックで一括処理。差分プレビューを確認してCSVを保存。",
  },
]

export function HowToSteps() {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur-sm">
      <div className="mb-6 flex items-center gap-2">
        <h2 className="text-base font-semibold text-foreground">使い方</h2>
        <span className="rounded-full bg-brand/12 px-2.5 py-0.5 text-xs font-medium text-brand">
          3ステップ
        </span>
      </div>

      <ol className="relative grid gap-6 md:grid-cols-3 md:gap-4">
        {/* 接続ライン（デスクトップ） */}
        <div
          className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-brand/40 via-border to-brand-2/40 md:block"
          aria-hidden="true"
        />
        {STEPS.map(({ n, icon: Icon, title, desc }) => (
          <li key={n} className="relative flex gap-4 md:flex-col md:gap-3">
            <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-surface shadow-lg">
              <Icon className="h-5 w-5 text-brand" strokeWidth={1.8} />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-[10px] font-bold text-white">
                {n[1]}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground text-pretty">
                {desc}
              </p>
            </div>
          </li>
        ))}
      </ol>

    </div>
  )
}
