// 住所正規化ロジック（Python 版から TypeScript へ移植）
// すべての処理はブラウザのメモリ上でのみ実行され、サーバーには送信されません。

// 都道府県: 正式表記 -> [正式表記, 省略形]
const PREFECTURE_SUFFIXES: Array<[string, string[]]> = [
  ["東京都", ["東京都", "東京"]],
  ["大阪府", ["大阪府", "大阪"]],
  ["京都府", ["京都府", "京都"]],
  ["北海道", ["北海道", "北海"]],
  ["神奈川県", ["神奈川県", "神奈川"]],
  ["愛知県", ["愛知県", "愛知"]],
  ["埼玉県", ["埼玉県", "埼玉"]],
  ["千葉県", ["千葉県", "千葉"]],
  ["兵庫県", ["兵庫県", "兵庫"]],
  ["福岡県", ["福岡県", "福岡"]],
  ["静岡県", ["静岡県", "静岡"]],
  ["茨城県", ["茨城県", "茨城"]],
  ["広島県", ["広島県", "広島"]],
  ["宮城県", ["宮城県", "宮城"]],
  ["長野県", ["長野県", "長野"]],
  ["新潟県", ["新潟県", "新潟"]],
  ["岐阜県", ["岐阜県", "岐阜"]],
  ["栃木県", ["栃木県", "栃木"]],
  ["群馬県", ["群馬県", "群馬"]],
  ["岡山県", ["岡山県", "岡山"]],
  ["福島県", ["福島県", "福島"]],
  ["三重県", ["三重県", "三重"]],
  ["熊本県", ["熊本県", "熊本"]],
  ["鹿児島県", ["鹿児島県", "鹿児島"]],
  ["沖縄県", ["沖縄県", "沖縄"]],
  ["滋賀県", ["滋賀県", "滋賀"]],
  ["山口県", ["山口県", "山口"]],
  ["愛媛県", ["愛媛県", "愛媛"]],
  ["長崎県", ["長崎県", "長崎"]],
  ["奈良県", ["奈良県", "奈良"]],
  ["青森県", ["青森県", "青森"]],
  ["岩手県", ["岩手県", "岩手"]],
  ["大分県", ["大分県", "大分"]],
  ["石川県", ["石川県", "石川"]],
  ["山形県", ["山形県", "山形"]],
  ["宮崎県", ["宮崎県", "宮崎"]],
  ["富山県", ["富山県", "富山"]],
  ["秋田県", ["秋田県", "秋田"]],
  ["和歌山県", ["和歌山県", "和歌山"]],
  ["山梨県", ["山梨県", "山梨"]],
  ["香川県", ["香川県", "香川"]],
  ["佐賀県", ["佐賀県", "佐賀"]],
  ["福井県", ["福井県", "福井"]],
  ["徳島県", ["徳島県", "徳島"]],
  ["高知県", ["高知県", "高知"]],
  ["島根県", ["島根県", "島根"]],
  ["鳥取県", ["鳥取県", "鳥取"]],
]

/** 都道府県名を正規化する */
export function normalizePrefecture(address: string): string {
  let result = address.trim()

  // 二重サフィックスを除去（例: 東京都都 -> 東京都）
  for (const [correct] of PREFECTURE_SUFFIXES) {
    const suffix = correct[correct.length - 1] // 都/府/道/県
    const doubled = correct + suffix
    if (result.includes(doubled)) {
      result = result.split(doubled).join(correct)
    }
  }

  // 省略形を補完（先頭一致）
  for (const [correct, variants] of PREFECTURE_SUFFIXES) {
    for (const variant of variants) {
      if (result.startsWith(variant) && !result.startsWith(correct)) {
        result = correct + result.slice(variant.length)
        break
      }
    }
  }

  return result
}

/** 全角→半角の統一（英数字・記号・スペース）、全角カナは維持 */
export function normalizeWidth(address: string): string {
  const chars: string[] = []
  for (const ch of address) {
    const code = ch.codePointAt(0) ?? 0
    if (code >= 0xff01 && code <= 0xff5e) {
      // 全角英数字・記号 -> 半角
      chars.push(String.fromCodePoint(code - 0xfee0))
    } else if (ch === "\u3000") {
      // 全角スペース -> 半角スペース
      chars.push(" ")
    } else {
      chars.push(ch)
    }
  }
  let normalized = chars.join("")
  // 連続スペースを1つに
  normalized = normalized.replace(/[ \u3000]+/g, " ").trim()
  return normalized
}

/** 番地・号のハイフン表記を統一する */
export function normalizeHyphen(address: string): string {
  let result = address
  // 各種ダッシュ類を半角ハイフンに統一
  result = result.replace(/[‐‑‒–—―ー－−〜～]/g, "-")
  result = result.split("－").join("-").split("ｰ").join("-")
  // 番地表記: 「1丁目2番地3号」-> 「1-2-3」
  result = result.replace(/(\d+)\s*丁目\s*(\d+)\s*番地?\s*(\d+)\s*号?/g, "$1-$2-$3")
  result = result.replace(/(\d+)\s*丁目\s*(\d+)\s*番地?/g, "$1-$2")
  result = result.replace(/(\d+)\s*番地?\s*(\d+)\s*号?/g, "$1-$2")
  result = result.replace(/(\d+)\s*番地/g, "$1")
  // ハイフン前後のスペースを除去
  result = result.replace(/\s*-\s*/g, "-")
  // 連続ハイフンを1つに
  result = result.replace(/-{2,}/g, "-")
  return result
}

export interface NormalizeOptions {
  prefecture: boolean
  width: boolean
  hyphen: boolean
}

/** 全正規化を適用する */
export function normalizeAddress(address: string, options: NormalizeOptions): string {
  if (typeof address !== "string" || address.trim() === "") {
    return address
  }
  let result = address
  if (options.width) result = normalizeWidth(result)
  if (options.prefecture) result = normalizePrefecture(result)
  if (options.hyphen) result = normalizeHyphen(result)
  return result
}
