"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
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
import { createClient } from "@/utils/supabase/client"
import { toast } from "sonner"

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
  const [zipCols, setZipCols] = useState<string[]>([])
  const [options, setOptions] = useState<NormalizeOptions>({
    prefecture: true,
    width: true,
    hyphen: true,
  })

  const [resultRows, setResultRows] = useState<Record<string, string>[] | null>(null)
  const [processedCols, setProcessedCols] = useState<string[]>([])
  const [processedZipCols, setProcessedZipCols] = useState<string[]>([])
  const [changeCount, setChangeCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isLimited, setIsLimited] = useState(false)

  const [progress, setProgress] = useState(0)
  const [session, setSession] = useState<any>(null)
  const [remainingLimit, setRemainingLimit] = useState(100)
  const [isAnon, setIsAnon] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const supabase = createClient()
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        setIsAnon(false)
        setSession(user)
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)
        
        const { data } = await supabase
          .from('usage_logs')
          .select('rows_processed')
          .gte('created_at', startOfMonth.toISOString())
          
        let used = 0
        if (data) {
          used = data.reduce((acc, row) => acc + row.rows_processed, 0)
        }
        setRemainingLimit(Math.max(0, 100 - used))
      }
    }
    checkUser()
  }, [])

  async function handleFile(file: File) {
    setError(null)
    try {
      const data = await parseCsvFile(file)
      
      let finalRows = data.rows
      if (isAnon) {
        if (finalRows.length > 30) {
          finalRows = finalRows.slice(0, 30)
          setIsLimited(true)
        } else {
          setIsLimited(false)
        }
      } else {
        if (finalRows.length > remainingLimit) {
          finalRows = finalRows.slice(0, remainingLimit)
          setIsLimited(true)
        } else {
          setIsLimited(false)
        }
      }

      setParsed({ ...data, rows: finalRows })
      setFileName(file.name)
      
      // 住所らしいカラム名を自動選択（住所, 所在地, address など）
      const addressKeywords = ['住所', '所在地', 'address', '県', '市', '町', '村']
      const defaultAddressCols = data.columns.filter(col => 
        addressKeywords.some(keyword => col.toLowerCase().includes(keyword))
      )
      setAddressCols(defaultAddressCols)

      const zipKeywords = ['郵便番号', 'zip', 'postcode', 'postal']
      const defaultZipCols = data.columns.filter(col => 
        zipKeywords.some(keyword => col.toLowerCase().includes(keyword))
      )
      setZipCols(defaultZipCols)
      
      setResultRows(null)
      setProcessedCols([])
      setProcessedZipCols([])
      setProgress(0)
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
    setProcessedZipCols([])
    setError(null)
    setIsLimited(false)
    setProgress(0)
  }

  async function handleRun() {
    if (!parsed || addressCols.length === 0) return
    setLoading(true)
    setError(null)
    setProgress(0)
    
    try {
      const CHUNK_SIZE = 100
      let allResults: Record<string, string>[] = []
      let totalChangeCount = 0

      for (let i = 0; i < parsed.rows.length; i += CHUNK_SIZE) {
        const chunk = parsed.rows.slice(i, i + CHUNK_SIZE)
        
        const response = await fetch("/api/normalize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: chunk,
            address_cols: addressCols,
            zip_cols: zipCols,
            do_prefecture: options.prefecture,
            do_width: options.width,
            do_hyphen: options.hyphen
          })
        })
        
        const data = await response.json()
        if (data.status === "error") {
          throw new Error(data.message)
        }
        
        allResults = allResults.concat(data.data)
        totalChangeCount += data.change_count
        
        setProgress(Math.min(100, Math.round(((i + chunk.length) / parsed.rows.length) * 100)))
      }
      
      setResultRows(allResults)
      setProcessedCols([...addressCols])
      setProcessedZipCols([...zipCols])
      setChangeCount(totalChangeCount)
      
      toast.success("正規化が完了しました！", {
        description: `${totalChangeCount.toLocaleString()}件のデータを綺麗に整形しました。`,
      })
    } catch (err: any) {
      console.error(err)
      setError("エラーが発生しました: " + (err.message || "通信エラー"))
    } finally {
      setLoading(false)
      if (progress < 100 && !error) setProgress(100)
    }
  }

  function downloadFull() {
    if (!resultRows || !parsed) return
    const extraAddressCols = processedCols.flatMap((c) => [
      `${c}_正規化済`,
      `${c}_緯度`,
      `${c}_経度`,
      `${c}_精度レベル`,
    ])
    const extraZipCols = processedZipCols.map((c) => `${c}_整形済`)
    
    const columns = [...parsed.columns, ...extraAddressCols, ...extraZipCols]
    downloadCsv(rowsToCsv(resultRows, columns), "addresses_normalized_full.csv")
  }

  function downloadReplaced() {
    if (!resultRows || !parsed) return
    
    // Create new columns list where original column is replaced
    const newColumns: string[] = []
    for (const col of parsed.columns) {
      newColumns.push(col)
      if (processedCols.includes(col)) {
        newColumns.push(`${col}_緯度`, `${col}_経度`, `${col}_精度レベル`)
      }
    }

    const rows = resultRows.map((r) => {
      const copy = { ...r }
      for (const col of processedCols) {
        if (`${col}_正規化済` in copy) {
          copy[col] = copy[`${col}_正規化済`]
          delete copy[`${col}_正規化済`]
        }
      }
      for (const col of processedZipCols) {
        if (`${col}_整形済` in copy) {
          copy[col] = copy[`${col}_整形済`]
          delete copy[`${col}_整形済`]
        }
      }
      return copy
    })
    
    downloadCsv(rowsToCsv(rows, newColumns), "addresses_normalized_replaced.csv")
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
                <label className="mb-3 block text-sm font-semibold text-foreground">
                  住所データが入っている列を選択してください
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {parsed.columns.map((c) => {
                    const forbiddenKeywords = ['氏名', '名前', 'name', '電話', 'tel', 'メール', 'mail', '郵便番号', 'zip', '年齢', '番号', 'id']
                    const isForbidden = forbiddenKeywords.some(kw => c.toLowerCase().includes(kw))
                    
                    if (isForbidden) return null;

                    return (
                      <label
                        key={c}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                          isForbidden 
                            ? "opacity-50 cursor-not-allowed bg-surface/30 border-border/50" 
                            : `cursor-pointer hover:bg-surface-2 ${addressCols.includes(c) ? "border-brand bg-brand/5 text-foreground" : "border-border bg-surface text-muted-foreground"}`
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border bg-surface-2 text-brand focus:ring-brand focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          checked={addressCols.includes(c)}
                          disabled={isForbidden}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setAddressCols((prev) => [...prev, c])
                            } else {
                              setAddressCols((prev) => prev.filter((col) => col !== c))
                            }
                          }}
                        />
                        <span className="truncate leading-none pt-0.5">
                          {c}
                          {isForbidden && <span className="text-[10px] text-muted-foreground ml-1">(対象外)</span>}
                        </span>
                      </label>
                    )
                  })}
                </div>
              </div>

              <div className="pt-2 border-t border-border/50">
                <label className="mb-3 block text-sm font-semibold text-foreground">
                  郵便番号データが入っている列を選択してください
                </label>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
                  {parsed.columns.map((c) => {
                    const forbiddenKeywords = ['氏名', '名前', 'name', '電話', 'tel', 'メール', 'mail', '年齢', '番号', 'id', '住所', '所在地', '県', '市', '町', '村']
                    // "郵便番号" の "番号" がひっかからないように調整
                    const isForbidden = forbiddenKeywords.some(kw => {
                      if (kw === '番号' && c.toLowerCase().includes('郵便番号')) return false;
                      return c.toLowerCase().includes(kw);
                    })
                    
                    if (isForbidden) return null;

                    return (
                      <label
                        key={c}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                          isForbidden 
                            ? "opacity-50 cursor-not-allowed bg-surface/30 border-border/50" 
                            : `cursor-pointer hover:bg-surface-2 ${zipCols.includes(c) ? "border-brand bg-brand/5 text-foreground" : "border-border bg-surface text-muted-foreground"}`
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-border bg-surface-2 text-brand focus:ring-brand focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                          checked={zipCols.includes(c)}
                          disabled={isForbidden}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setZipCols((prev) => [...prev, c])
                            } else {
                              setZipCols((prev) => prev.filter((col) => col !== c))
                            }
                          }}
                        />
                        <span className="truncate leading-none pt-0.5">
                          {c}
                          {isForbidden && <span className="text-[10px] text-muted-foreground ml-1">(対象外)</span>}
                        </span>
                      </label>
                    )
                  })}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">※ 半角数字・ハイフンあり（例: 123-4567）の標準形式に自動整形されます。</p>
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
                      {isAnon ? (
                        <>
                          <h4 className="font-bold">無料のお試し枠（30件）を越える件数が入っています</h4>
                          <p className="mt-1 text-xs text-amber-800">
                            31件目以降のデータはカットされます。無料で100件まで処理するには、アカウントを作成してログインしてください。
                          </p>
                          <Button asChild variant="default" className="mt-3 bg-amber-500 hover:bg-amber-600 font-bold text-white shadow-sm">
                            <Link href="/login">無料でアカウント作成・ログイン</Link>
                          </Button>
                        </>
                      ) : (
                        <>
                          <h4 className="font-bold">無料版の制限（月100件）に到達しました</h4>
                          <p className="mt-1 text-xs text-amber-800">
                            制限を超えたデータはカットされています。無制限のCSV一括処理をご希望の場合は、プロプランへのアップグレードをご検討ください。
                          </p>
                          <Button
                            variant="default"
                            className="mt-3 bg-amber-500 hover:bg-amber-600 font-bold text-white shadow-sm"
                            onClick={async () => {
                              try {
                                const res = await fetch('/api/checkout', { method: 'POST' });
                                const data = await res.json();
                                if (data.url) {
                                  window.open(data.url, '_blank');
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
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button
                  onClick={handleRun}
                  disabled={(!options.prefecture && !options.width && !options.hyphen) || loading}
                  className="h-11 w-full bg-gradient-to-r from-brand to-[#8b85ff] text-white shadow-[0_6px_24px_-6px_rgba(108,99,255,0.7)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_32px_-6px_rgba(108,99,255,0.8)] sm:w-auto sm:px-8"
                >
                  <Rocket className={`mr-2 h-4 w-4 ${loading ? 'animate-pulse' : ''}`} />
                  {loading ? '一括正規化を実行中...' : '一括正規化を実行する'}
                </Button>
                {loading && (
                  <div className="flex-1 w-full flex items-center gap-3">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2 border border-border">
                      <div
                        className="h-full bg-brand transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground w-10 text-right">
                      {progress}%
                    </span>
                  </div>
                )}
              </div>
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
