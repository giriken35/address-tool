"use client"

import { Building2, CaseSensitive, Hash, Check } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import type { NormalizeOptions } from "@/lib/address-normalizer"

interface OptionDef {
  key: keyof NormalizeOptions
  icon: LucideIcon
  title: string
  example: string
}

const OPTIONS: OptionDef[] = [
  {
    key: "prefecture",
    icon: Building2,
    title: "都道府県の統一",
    example: "「東京」→「東京都」など省略形を正式表記に補完",
  },
  {
    key: "width",
    icon: CaseSensitive,
    title: "全角→半角の統一",
    example: "「Ａ棟１０１号」→「A棟101号」に変換",
  },
  {
    key: "hyphen",
    icon: Hash,
    title: "番地ハイフンの統一",
    example: "「1丁目2番地3号」→「1-2-3」に統一",
  },
]

interface OptionTogglesProps {
  options: NormalizeOptions
  onChange: (options: NormalizeOptions) => void
}

export function OptionToggles({ options, onChange }: OptionTogglesProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {OPTIONS.map(({ key, icon: Icon, title, example }) => {
        const active = options[key]
        return (
          <button
            key={key}
            type="button"
            role="checkbox"
            aria-checked={active}
            onClick={() => onChange({ ...options, [key]: !active })}
            className={`group relative flex flex-col gap-2 rounded-xl border p-4 text-left transition-all duration-200 ${
              active
                ? "border-brand/60 bg-brand/8 shadow-[0_0_0_1px_rgba(108,99,255,0.2)]"
                : "border-border bg-surface/60 hover:border-brand/40"
            }`}
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-colors ${
                  active ? "bg-brand/15 text-brand" : "bg-surface-2 text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
              </div>
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
                  active
                    ? "border-brand bg-brand text-white"
                    : "border-border bg-transparent"
                }`}
              >
                {active && <Check className="h-3.5 w-3.5" strokeWidth={3} />}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{example}</p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
