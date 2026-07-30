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
  const [showLevelHelp, setShowLevelHelp] = useState(false)

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
        
        <div className="ml-auto">
          <button
            onClick={() => setShowLevelHelp(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand/80 transition-colors"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-current text-[10px]">?</span>
            精度レベル(Lv)の読み方
          </button>
        </div>
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
                          const lat = r[`${col}_緯度`]
                          const lng = r[`${col}_経度`]
                          const level = r[`${col}_精度レベル`]
                          
                          return (
                            <div key={col} className={`mb-2.5 last:mb-0`}>
                              <div className={`${isColChanged ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                                {r[`${col}_正規化済`]}
                              </div>
                              {lat && lng && (
                                <div className="mt-1 flex items-center gap-2 text-[10px] text-brand/80">
                                  <span className="flex items-center gap-0.5 rounded bg-brand/10 px-1.5 py-0.5">
                                    <MapPin className="h-3 w-3" />
                                    {lat}, {lng}
                                  </span>
                                  <span className="rounded bg-surface-2 px-1.5 py-0.5 text-muted-foreground/80">
                                    精度Lv.{level}
                                  </span>
                                </div>
                              )}
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

      {/* 精度レベル解説モーダル */}
      {showLevelHelp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border bg-background p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="mb-2 text-lg font-bold text-foreground">精度レベル(Lv)について</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Geoloniaエンジンの解析結果の信頼度を示すスコアです。
            </p>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-3 rounded-lg bg-surface-2 p-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand font-bold">8</div>
                <div>
                  <p className="font-semibold text-foreground">号・建物まで特定（最高精度）</p>
                  <p className="text-muted-foreground text-xs mt-0.5">データベースと完全一致しました。</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 font-bold text-muted-foreground">7</div>
                <div>
                  <p className="font-semibold text-foreground">街区・番地まで特定</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 font-bold text-muted-foreground">3</div>
                <div>
                  <p className="font-semibold text-foreground">町名・丁目まで特定</p>
                  <p className="text-muted-foreground text-xs mt-0.5">※番地以降は推測で結合されています。</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 font-bold text-muted-foreground">2</div>
                <div>
                  <p className="font-semibold text-foreground">市区町村まで特定</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border p-3 opacity-70">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-2 font-bold text-muted-foreground">0</div>
                <div>
                  <p className="font-semibold text-foreground">解析不可</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowLevelHelp(false)}
                className="rounded-lg bg-brand px-6 py-2 text-sm font-medium text-white shadow hover:bg-brand/90 transition-colors"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
