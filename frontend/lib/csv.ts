import Papa from "papaparse"

export interface ParsedCsv {
  columns: string[]
  rows: Record<string, string>[]
  encoding: string
}

/**
 * ファイルをエンコーディング自動判別して読み込む。
 * UTF-8 を優先し、失敗したら Shift-JIS(cp932) で読み直す。
 */
function decodeBuffer(buffer: ArrayBuffer): { text: string; encoding: string } {
  const bytes = new Uint8Array(buffer)

  // BOM 判定
  if (bytes.length >= 3 && bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf) {
    return {
      text: new TextDecoder("utf-8").decode(bytes.subarray(3)),
      encoding: "UTF-8-SIG",
    }
  }

  // UTF-8 として厳密デコードを試みる
  try {
    const text = new TextDecoder("utf-8", { fatal: true }).decode(bytes)
    return { text, encoding: "UTF-8" }
  } catch {
    // Shift-JIS / CP932 にフォールバック
    try {
      const text = new TextDecoder("shift_jis").decode(bytes)
      return { text, encoding: "SHIFT_JIS" }
    } catch {
      // 最終フォールバック（置換文字許容）
      const text = new TextDecoder("utf-8").decode(bytes)
      return { text, encoding: "UTF-8" }
    }
  }
}

export async function parseCsvFile(file: File): Promise<ParsedCsv> {
  const buffer = await file.arrayBuffer()
  const { text, encoding } = decodeBuffer(buffer)

  const result = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  })

  if (!result.meta.fields || result.meta.fields.length === 0) {
    throw new Error("列を検出できませんでした")
  }

  return {
    columns: result.meta.fields,
    rows: result.data,
    encoding,
  }
}

/** 行データを CSV 文字列に変換（UTF-8 BOM 付きで Excel 互換） */
export function rowsToCsv(rows: Record<string, string>[], columns: string[]): string {
  return Papa.unparse(
    {
      fields: columns,
      data: rows.map((r) => columns.map((c) => r[c] ?? "")),
    },
    { quotes: false },
  )
}

/** UTF-8 BOM 付き Blob を生成しダウンロード */
export function downloadCsv(csv: string, filename: string): void {
  const bom = "\uFEFF"
  const blob = new Blob([bom + csv], { type: "text/csv;charset=utf-8;" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const SAMPLE_CSV = `氏名,電話番号,会社住所,自宅住所
山田太郎,090-1234-5678,東京1-2-3,大阪府大阪市北区１－２－３
佐藤花子,080-9876-5432,神奈川横浜市港北区新横浜２丁目５番地３号,東京都渋谷区代々木１番地２号
鈴木一郎,03-1111-2222,北海道札幌市中央区大通西１０丁目,愛知名古屋市中区栄３丁目１５番地１号
田中次郎,06-3333-4444,Ａ社東京都港区六本木１－１－１,京都府京都市左京区吉田本町`
