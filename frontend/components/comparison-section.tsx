import { CheckCircle2, XCircle, MinusCircle } from "lucide-react"

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

      <div className="overflow-x-auto pb-4">
        <div className="min-w-[800px] rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
          <table className="w-full text-sm text-left">
            <thead className="bg-surface/50 text-muted-foreground border-b border-border">
              <tr>
                <th className="p-4 font-medium w-1/4">機能・特徴</th>
                <th className="p-4 font-bold text-brand bg-brand/5 border-l border-r border-brand/20 w-1/4 text-center">当サービス (Proプラン)</th>
                <th className="p-4 font-medium w-1/4 text-center">A社 (大手地図系API)</th>
                <th className="p-4 font-medium w-1/4 text-center">B社 (Kintoneプラグイン等)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="p-4 font-medium">料金</td>
                <td className="p-4 text-center font-bold text-foreground bg-brand/5 border-l border-r border-brand/20">月額 5,000円<br/><span className="text-xs text-muted-foreground font-normal">（会社全体で使い放題）</span></td>
                <td className="p-4 text-center text-muted-foreground">月額 50,000円〜<br/><span className="text-xs">（または1ユーザー毎課金）</span></td>
                <td className="p-4 text-center text-muted-foreground">月額 2,000円〜<br/><span className="text-xs">（機能限定的）</span></td>
              </tr>
              <tr>
                <td className="p-4 font-medium">表記ゆれ補正<br/><span className="text-xs text-muted-foreground font-normal">（例：1-2 → 1丁目2番地）</span></td>
                <td className="p-4 text-center bg-brand/5 border-l border-r border-brand/20"><CheckCircle2 className="inline h-5 w-5 text-brand" /></td>
                <td className="p-4 text-center"><CheckCircle2 className="inline h-5 w-5 text-green-500" /></td>
                <td className="p-4 text-center"><MinusCircle className="inline h-5 w-5 text-muted-foreground" /><br/><span className="text-xs text-muted-foreground">※郵便番号からの住所入力のみ</span></td>
              </tr>
              <tr>
                <td className="p-4 font-medium">緯度経度抽出<br/><span className="text-xs text-muted-foreground font-normal">（ジオコーディング）</span></td>
                <td className="p-4 text-center bg-brand/5 border-l border-r border-brand/20"><CheckCircle2 className="inline h-5 w-5 text-brand" /></td>
                <td className="p-4 text-center"><CheckCircle2 className="inline h-5 w-5 text-green-500" /></td>
                <td className="p-4 text-center"><XCircle className="inline h-5 w-5 text-red-500" /></td>
              </tr>
              <tr>
                <td className="p-4 font-medium">データ保存・ログ</td>
                <td className="p-4 text-center bg-brand/5 border-l border-r border-brand/20 font-bold text-brand">
                  一切保存しない<br/><span className="text-xs font-normal">（完全揮発・高セキュリティ）</span>
                </td>
                <td className="p-4 text-center text-muted-foreground">サーバーに記録</td>
                <td className="p-4 text-center text-muted-foreground">自社環境に依存</td>
              </tr>
              <tr>
                <td className="p-4 font-medium">API連携</td>
                <td className="p-4 text-center bg-brand/5 border-l border-r border-brand/20"><CheckCircle2 className="inline h-5 w-5 text-brand" /></td>
                <td className="p-4 text-center"><CheckCircle2 className="inline h-5 w-5 text-green-500" /></td>
                <td className="p-4 text-center"><MinusCircle className="inline h-5 w-5 text-muted-foreground" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
