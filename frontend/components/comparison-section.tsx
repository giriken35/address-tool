// Icons removed in favor of text symbols

export function ComparisonSection() {
  return (
    <section className="mt-20 mx-auto max-w-5xl px-4 sm:px-6 scroll-mt-32" id="comparison">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
          他社サービスとの比較
        </h2>
        <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">
          圧倒的なコストパフォーマンスで、企業の住所データ整備の課題を解決します。
        </p>
      </div>

      {/* スクロールなしで収まるように最適化したテーブル */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        <table className="w-full text-xs sm:text-sm text-left table-fixed">
          <thead className="bg-surface/50 text-muted-foreground border-b border-border">
            <tr>
              <th className="p-2 sm:p-4 font-medium w-[28%]">機能・特徴</th>
              <th className="p-2 sm:p-4 font-bold text-brand bg-brand/5 border-l border-r border-brand/20 w-[28%] text-center">当サービス<br className="sm:hidden"/><span className="hidden sm:inline"> </span>(Pro)</th>
              <th className="p-2 sm:p-4 font-medium w-[22%] text-center">A社<br className="sm:hidden"/><span className="hidden sm:inline"> </span>(地図API)</th>
              <th className="p-2 sm:p-4 font-medium w-[22%] text-center">B社<br className="sm:hidden"/><span className="hidden sm:inline"> </span>(プラグイン)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            <tr>
              <td className="p-2 sm:p-4 font-medium">料金</td>
              <td className="p-2 sm:p-4 text-center font-bold text-foreground bg-brand/5 border-l border-r border-brand/20">
                月額 5,000円<br/><span className="text-[10px] sm:text-xs text-muted-foreground font-normal">（使い放題）</span>
              </td>
              <td className="p-2 sm:p-4 text-center text-muted-foreground">月額 5万円〜</td>
              <td className="p-2 sm:p-4 text-center text-muted-foreground">月額 2千円〜</td>
            </tr>
            <tr>
              <td className="p-2 sm:p-4 font-medium">表記ゆれ補正<br/><span className="text-[10px] sm:text-xs text-muted-foreground font-normal">（1-2 → 1丁目...）</span></td>
              <td className="p-2 sm:p-4 text-center bg-brand/5 border-l border-r border-brand/20"><span className="text-xl sm:text-2xl font-black text-brand">◯</span></td>
              <td className="p-2 sm:p-4 text-center"><span className="text-xl sm:text-2xl font-black text-green-500">◯</span></td>
              <td className="p-2 sm:p-4 text-center"><span className="text-xl sm:text-2xl font-bold text-muted-foreground">△</span><br/><span className="hidden sm:block text-[10px] text-muted-foreground mt-1">※郵便番号のみ</span></td>
            </tr>
            <tr>
              <td className="p-2 sm:p-4 font-medium">緯度経度抽出<br/><span className="text-[10px] sm:text-xs text-muted-foreground font-normal">（ジオコーディング）</span></td>
              <td className="p-2 sm:p-4 text-center bg-brand/5 border-l border-r border-brand/20"><span className="text-xl sm:text-2xl font-black text-brand">◯</span></td>
              <td className="p-2 sm:p-4 text-center"><span className="text-xl sm:text-2xl font-black text-green-500">◯</span></td>
              <td className="p-2 sm:p-4 text-center"><span className="text-xl sm:text-2xl font-bold text-red-500">✕</span></td>
            </tr>
            <tr>
              <td className="p-2 sm:p-4 font-medium">データ保存</td>
              <td className="p-2 sm:p-4 text-center bg-brand/5 border-l border-r border-brand/20 font-bold text-brand">
                保存しない<br/><span className="text-[10px] sm:text-xs font-normal">（完全揮発）</span>
              </td>
              <td className="p-2 sm:p-4 text-center text-muted-foreground">記録される</td>
              <td className="p-2 sm:p-4 text-center text-muted-foreground">自社依存</td>
            </tr>
            <tr>
              <td className="p-2 sm:p-4 font-medium">API連携</td>
              <td className="p-2 sm:p-4 text-center bg-brand/5 border-l border-r border-brand/20"><span className="text-xl sm:text-2xl font-black text-brand">◯</span></td>
              <td className="p-2 sm:p-4 text-center"><span className="text-xl sm:text-2xl font-black text-green-500">◯</span></td>
              <td className="p-2 sm:p-4 text-center"><span className="text-xl sm:text-2xl font-bold text-muted-foreground">△</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  )
}
