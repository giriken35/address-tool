"use client"

import { useMemo } from "react"

interface AdSlotProps {
  /** iframe に流し込む広告 HTML（<script> タグを含む） */
  html: string
  /** 表示高さ(px) */
  height: number
  /** 表示幅(px)。未指定なら親要素幅いっぱい */
  width?: number
  title: string
  className?: string
}

/**
 * 外部広告タグ（admax / A8.net 等）を安全に埋め込むための iframe ラッパー。
 * admax の shinobi スクリプトは document.write を使うため、
 * 直接 DOM へ挿入せず iframe(srcDoc) でサンドボックス化して読み込みます。
 * （元の Streamlit components.html と同等の挙動）
 */
export function AdSlot({ html, height, width, title, className }: AdSlotProps) {
  const srcDoc = useMemo(
    () => `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
<style>
  html,body{margin:0;padding:0;background:transparent;}
  body{display:flex;align-items:center;justify-content:center;overflow:hidden;}
</style>
</head>
<body>
${html}
</body>
</html>`,
    [html],
  )

  return (
    <iframe
      title={title}
      srcDoc={srcDoc}
      width={width}
      height={height}
      scrolling="no"
      loading="lazy"
      // 広告スクリプト実行に必要な最小権限のみ許可
      sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      className={className}
      style={{ border: 0, width: width ? `${width}px` : "100%", height: `${height}px` }}
    />
  )
}

/** admax 広告タグ（左右サイド用） */
export const ADMAX_HTML = `<!-- admax -->
<script src="https://adm.shinobi.jp/s/cac2809c006d7b949922df562a16638e"></script>
<!-- admax -->`

/** 下部バナー（A8.net / 名刺印刷） */
export const BANNER_HTML = `<a href="https://px.a8.net/svt/ejp?a8mat=4B5SK9+7OUL2Q+2DS2+BZGEP" rel="nofollow" target="_blank">
<img border="0" width="300" height="250" alt="" src="https://www21.a8.net/svt/bgt?aid=260610777465&wid=001&eno=01&mid=s00000011117002013000&mc=1"></a>
<img border="0" width="1" height="1" src="https://www13.a8.net/0.gif?a8mat=4B5SK9+7OUL2Q+2DS2+BZGEP" alt="">`
