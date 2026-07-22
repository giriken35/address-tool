"use client"

import { useState } from "react"
import {
  CheckCircle2,
  ChevronDown,
  Rocket,
  Download,
  FileDown,
  Replace,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { FileDropzone } from "@/components/file-dropzone"
import { OptionToggles } from "@/components/option-toggles"
import { ResultPreview } from "@/components/result-preview"
import { HowToSteps } from "@/components/how-to-steps"
import { parseCsvFile, rowsToCsv, downloadCsv, SAMPLE_CSV, type ParsedCsv } from "@/lib/csv"
import { normalizeAddress, type NormalizeOptions } from "@/lib/address-normalizer"

function StepHeader({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-xs font-bold text-white">
        {n}
      </span>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
    </div>
  )
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur-sm sm:p-6">
      {children}
    </section>
  )
}

export function NormalizerTool() {
  const [parsed, setParsed] = useState<ParsedCsv | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [addressCols, setAddressCols] = useState<string[]>([])
  const [options, setOptions] = useState<NormalizeOptions>({
    prefecture: true,
    width: true,
    hyphen: true,
  })

  const [resultRows, setResultRows] = useState<Record<string, string>[] | null>(null)
  const [processedCols, setProcessedCols] = useState<string[]>([])
  const [changeCount, setChangeCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isLimited, setIsLimited] = useState(false)

  async function handleFile(file: File) {
    setError(null)
    try {
      const data = await parseCsvFile(file)
      
      let finalRows = data.rows
      if (finalRows.length > 100) {
        finalRows = finalRows.slice(0, 100)
        setIsLimited(true)
      } else {
        setIsLimited(false)
      }

      setParsed({ ...data, rows: finalRows })
      setFileName(file.name)
      setAddressCols(data.columns.length > 0 ? [data.columns[0]] : [])
      setResultRows(null)
      setProcessedCols([])
    } catch {
      setError(
        "エンコーディングを判別できませんでした。UTF-8 または Shift-JIS の CSV をご利用ください。",
      )
      setParsed(null)
      setFileName(null)
    }
  }

  function handleClear() {
    setParsed(null)
    setFileName(null)
    setResultRows(null)
    setProcessedCols([])
    setError(null)
    setIsLimited(false)
  }

  async function handleRun() {
    if (!parsed || addressCols.length === 0) return
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch("/api/normalize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: parsed.rows,
          address_cols: addressCols,
          do_prefecture: options.prefecture,
          do_width: options.width,
          do_hyphen: options.hyphen
        })
      })
      
      const data = await response.json()
      if (data.status === "error") {
        setError("エラーが発生しました: " + data.message)
      } else {
        setResultRows(data.data)
        setProcessedCols([...addressCols])
        setChangeCount(data.change_count)
      }
    } catch (err) {
      console.error(err)
      setError("通信エラーが発生しました。バックエンド(FastAPI)が起動しているか確認してください。")
    } finally {
      setLoading(false)
    }
  }

  function downloadFull() {
    if (!resultRows || !parsed) return
    const extraCols = processedCols.map((c) => `${c}_正規化済`)
    const columns = [...parsed.columns, ...extraCols]
    downloadCsv(rowsToCsv(resultRows, columns), "addresses_normalized_full.csv")
  }

  function downloadReplaced() {
    if (!resultRows || !parsed) return
    const columns = parsed.columns
    const rows = resultRows.map((r) => {
      const copy = { ...r }
      for (const col of processedCols) {
        if (`${col}_正規化済` in copy) {
          copy[col] = copy[`${col}_正規化済`]
          delete copy[`${col}_正規化済`]
        }
      }
      return copy
    })
    downloadCsv(rowsToCsv(rows, columns), "addresses_normalized_replaced.csv")
  }

  function tryStack() {
    const blob = new Blob([SAMPLE_CSV], { type: "text/csv" })
    const file = new File([blob], "sample_addresses.csv", { type: "text/csv" })
    handleFile(file)
  }

  return (
    <div className="space-y-4">
      {/* STEP 1 */}
      <Panel>
        <StepHeader n={1} title="CSVファイルをアップロード" />
        <p className="mb-4 mt-1 pl-10 text-xs text-muted-foreground">
          UTF-8 / Shift-JIS の CSV に対応しています。
          <span className="block mt-1 opacity-80">※無料お試し版は1回の処理につき最大100件まで。（無制限のAPI/Proプランは右上のリンクから）</span>
        </p>
        <FileDropzone onFile={handleFile} fileName={fileName} onClear={handleClear} />

        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        {parsed && (
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-xl border border-brand-2/30 bg-brand-2/8 px-4 py-3 text-xs">
            <span className="inline-flex items-center gap-1.5 font-semibold text-brand-2">
              <CheckCircle2 className="h-4 w-4" /> 読み込み完了
            </span>
            <span className="text-muted-foreground">
              行数: <b className="text-foreground">{parsed.rows.length.toLocaleString()}</b>
            </span>
            <span className="text-muted-foreground">
              列数: <b className="text-foreground">{parsed.columns.length}</b>
            </span>
            <span className="text-muted-foreground">
              文字コード: <b className="text-foreground">{parsed.encoding}</b>
            </span>
          </div>
        )}

        {!parsed && (
          <button
            type="button"
            onClick={tryStack}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-brand transition-colors hover:text-brand-2"
          >
            <FileDown className="h-3.5 w-3.5" />
            サンプルCSVで試す
          </button>
        )}
      </Panel>

      {parsed ? (
        <>
          {/* STEP 2 */}
          <Panel>
            <StepHeader n={2} title="住所カラムと処理内容を選択" />
            <div className="mt-4 space-y-4 pl-0 sm:pl-10">
              <div>
                <label className="mb-2 block text-xs text-muted-foreground">
                  住所が入っているカラム（複数選択可）
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {parsed.columns.map((c) => (
                    <label
                      key={c}
                      className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors hover:bg-surface-2 ${
                        addressCols.includes(c)
                          ? "border-brand bg-brand/5 text-foreground"
                          : "border-border bg-surface text-muted-foreground"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-border bg-surface-2 text-brand focus:ring-brand focus:ring-offset-0"
                        checked={addressCols.includes(c)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setAddressCols((prev) => [...prev, c])
                          } else {
                            setAddressCols((prev) => prev.filter((col) => col !== c))
                          }
                        }}
                      />
                      <span className="truncate leading-none pt-0.5">{c}</span>
                    </label>
                  ))}
                </div>
              </div>

              <OptionToggles options={options} onChange={setOptions} />
            </div>
          </Panel>

          {/* STEP 3 */}
          <Panel>
            <StepHeader n={3} title="一括正規化を実行" />
            <div className="mt-4 pl-0 sm:pl-10">
              {isLimited && (
                <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                    <div>
                      <h4 className="font-bold">無料版の制限（100件）に到達しました</h4>
                      <p className="mt-1 text-xs text-amber-800">
                        101件目以降のデータはカットされています。無制限のCSV一括処理や、自社システムに直接つなぎ込める「開発者向けAPI」をご希望の場合は、プロプランへのアップグレードをご検討ください。
                      </p>
                      <Button
                        variant="default"
                        className="mt-3 bg-amber-500 hover:bg-amber-600 font-bold text-white shadow-sm"
                        onClick={async () => {
                          try {
                            const res = await fetch('/api/checkout', { method: 'POST' });
                            const data = await res.json();
                            if (data.url) {
                              window.location.href = data.url;
                            } else {
                              alert('Stripeの決済設定がまだ完了していません。Vercelの環境変数を設定してください。');
                            }
                          } catch (e) {
                            alert('エラーが発生しました');
                          }
                        }}
                      >
                        プロプランにアップグレード (月額5,000円)
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={handleRun}
                disabled={(!options.prefecture && !options.width && !options.hyphen) || loading}
                className="h-11 w-full bg-gradient-to-r from-brand to-[#8b85ff] text-white shadow-[0_6px_24px_-6px_rgba(108,99,255,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-6px_rgba(108,99,255,0.8)] sm:w-auto sm:px-8"
              >
                <Rocket className={`mr-2 h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
                {loading ? '一括正規化を実行中...' : '一括正規化を実行する'}
              </Button>
            </div>
          </Panel>

          {/* STEP 4 & 5 */}
          {resultRows && (
            <>
              <Panel>
                <div className="mb-4 flex items-center justify-between">
                  <StepHeader n={4} title="結果プレビュー" />
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-2/12 px-3 py-1 text-xs font-medium text-brand-2">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {changeCount.toLocaleString()} 件を変更
                  </span>
                </div>
                <ResultPreview
                  rows={resultRows}
                  originalCols={processedCols}
                  changeCount={changeCount}
                />
              </Panel>

              <Panel>
                <StepHeader n={5} title="CSVダウンロード" />
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface/60 p-4">
                    <Button
                      onClick={downloadFull}
                      className="h-10 w-full bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold text-white border-0 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                    >
                      <Download className="mr-2 h-4 w-4 shrink-0" />
                      <span>✨ 元のデータを残す</span>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      新しい列として追加します。元の住所と見比べたい方に安全でおすすめです。
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-xl border border-border bg-surface/60 p-4">
                    <Button
                      onClick={downloadReplaced}
                      className="h-10 w-full bg-gradient-to-r from-blue-500 to-indigo-600 font-semibold text-white border-0 transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(59,130,246,0.3)]"
                    >
                      <Replace className="mr-2 h-4 w-4 shrink-0 text-amber-400" />
                      <span>⚠️ 古い住所を上書き</span>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      古い住所を消去します。そのまま発送ソフト等に取り込みたい方向け。
                    </p>
                  </div>
                </div>
              </Panel>
            </>
          )}
        </>
      ) : (
        <HowToSteps />
      )}
    </div>
  )
}
