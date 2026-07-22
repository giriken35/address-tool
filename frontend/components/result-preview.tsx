"use client"

import { useMemo, useState } from "react"
import { MapPin, CheckCircle2, ArrowRight, Info } from "lucide-react"

interface ResultPreviewProps {
  rows: Record<string, string>[]
  originalCols: string[]
  changeCount: number
}

function StatCard({
  value,
  label,
  color,
}: {
  value: string
  label: string
  color: string
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-4 text-center">
      <div className="text-2xl font-bold tabular-nums" style={{ color }}>
        {value}
      </div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  )
}

export function ResultPreview({
  rows,
  originalCols,
  changeCount,
}: ResultPreviewProps) {
  const [changedOnly, setChangedOnly] = useState(true)

  const totalRows = rows.length
  const unchanged = totalRows - changeCount
  const changeRate = totalRows > 0 ? (changeCount / totalRows) * 100 : 0

  const displayRows = useMemo(() => {
    const filtered = changedOnly
      ? rows.filter((r) => originalCols.some(col => r[col] !== r[`${col}_正規化済`]))
      : rows
    return filtered.slice(0, 1000)
  }, [rows, changedOnly, originalCols])

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard value={totalRows.toLocaleString()} label="総レコード数" color="#e8eaf0" />
        <StatCard value={changeCount.toLocaleString()} label="変更件数" color="#00d4aa" />
        <StatCard value={unchanged.toLocaleString()} label="変更なし" color="#9399b2" />
        <StatCard value={`${changeRate.toFixed(1)}%`} label="変更率" color="#f5a623" />
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex rounded-lg border border-border bg-surface/60 p-1">
          <button
            type="button"
            onClick={() => setChangedOnly(true)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              changedOnly ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            変更があった行のみ
          </button>
          <button
            type="button"
            onClick={() => setChangedOnly(false)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              !changedOnly ? "bg-brand text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            全データ
          </button>
        </div>
        <span className="text-xs text-muted-foreground">
          {displayRows.length.toLocaleString()} 件を表示
          {!changedOnly && totalRows > 1000 && "（上位1000件）"}
        </span>
      </div>

      {displayRows.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="max-h-[420px] overflow-auto">
            <table className="w-full border-collapse text-sm">
              <thead className="sticky top-0 z-10 bg-surface-2/95 backdrop-blur">
                <tr>
                  <th className="border-b border-border px-4 py-3 text-left text-xs font-semibold text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3.5 w-3.5" /> 元の住所
                    </span>
                  </th>
                  <th className="w-8 border-b border-border" />
                  <th className="border-b border-border px-4 py-3 text-left text-xs font-semibold text-brand-2">
                    <span className="inline-flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5" /> 正規化後
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {displayRows.map((r, i) => {
                  const changed = originalCols.some(col => r[col] !== r[`${col}_正規化済`])
                  return (
                    <tr
                      key={i}
                      className="border-b border-border/60 transition-colors last:border-0 hover:bg-brand/5"
                    >
                      <td className="px-4 py-2.5 text-muted-foreground">
                        {originalCols.map(col => (
                          <div key={col} className="mb-1.5 last:mb-0">
                            <span className="mr-2 rounded bg-surface px-1.5 py-0.5 text-[10px] border border-border/50 text-muted-foreground/80">{col}</span>
                            {r[col]}
                          </div>
                        ))}
                      </td>
                      <td className="px-1 py-2.5 text-center align-middle">
                        {changed && (
                          <ArrowRight className="mx-auto h-3.5 w-3.5 text-brand/60" />
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        {originalCols.map(col => {
                          const isColChanged = r[col] !== r[`${col}_正規化済`]
                          return (
                            <div key={col} className={`mb-1.5 last:mb-0 ${isColChanged ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                              {r[`${col}_正規化済`]}
                            </div>
                          )
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-xl border border-border bg-surface/60 px-4 py-3 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          変更対象となった住所がありませんでした。
        </div>
      )}
    </div>
  )
}
