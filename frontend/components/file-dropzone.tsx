"use client"

import { useCallback, useRef, useState } from "react"
import { UploadCloud, FileSpreadsheet, X } from "lucide-react"

interface FileDropzoneProps {
  onFile: (file: File) => void
  fileName?: string | null
  onClear?: () => void
}

export function FileDropzone({ onFile, fileName, onClear }: FileDropzoneProps) {
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || files.length === 0) return
      const file = files[0]
      onFile(file)
    },
    [onFile],
  )

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setDragging(false)
      handleFiles(e.dataTransfer.files)
    },
    [handleFiles],
  )

  if (fileName) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-brand-2/40 bg-brand-2/8 p-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-2/15 text-brand-2">
          <FileSpreadsheet className="h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">{fileName}</p>
          <p className="text-xs text-muted-foreground">読み込み済み</p>
        </div>
        {onClear && (
          <button
            type="button"
            onClick={onClear}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            aria-label="ファイルをクリア"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => inputRef.current?.click()}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          inputRef.current?.click()
        }
      }}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={onDrop}
      className={`group relative flex cursor-pointer flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-all duration-300 ${
        dragging
          ? "scale-[1.01] border-brand bg-brand/10 shadow-[0_0_0_4px_rgba(108,99,255,0.15)]"
          : "border-border bg-surface-2/50 hover:border-brand/60 hover:bg-brand/5"
      }`}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".csv,text/csv"
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />

      {/* アニメーション光彩 */}
      <div
        className={`pointer-events-none absolute inset-0 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(108,99,255,0.15),transparent_70%)] transition-opacity duration-500 ${
          dragging ? "opacity-100" : "opacity-0 group-hover:opacity-60"
        }`}
      />

      <div
        className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-white shadow-[0_8px_30px_-8px_rgba(108,99,255,0.7)] transition-transform duration-300 ${
          dragging ? "scale-110" : "group-hover:scale-105 group-hover:-translate-y-1"
        }`}
      >
        <UploadCloud className="h-8 w-8" strokeWidth={1.8} />
      </div>

      <div className="relative">
        <p className="text-base font-semibold text-foreground">
          {dragging ? "ここにドロップしてください" : "CSVファイルをドラッグ＆ドロップ"}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          または<span className="text-brand"> クリックして選択</span>
          {" ・ "}UTF-8 / Shift-JIS 対応
        </p>
      </div>
    </div>
  )
}
