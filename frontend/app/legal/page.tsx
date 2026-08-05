import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: '特定商取引法に基づく表記 | 住所データ自動整形ツール',
}

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページへ戻る
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">特定商取引法に基づく表記</h1>
          
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm text-left">
              <tbody className="divide-y divide-border">
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground w-1/3 border-r border-border">販売事業者</th>
                  <td className="py-4 px-6 text-muted-foreground">[屋号]（※法人の場合は会社名、個人の場合は屋号または本名）</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">運営統括責任者</th>
                  <td className="py-4 px-6 text-muted-foreground">[本名を記載してください（※個人の場合は本名必須）]</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">所在地</th>
                  <td className="py-4 px-6 text-muted-foreground">
                    〒150-0043<br/>
                    東京都渋谷区道玄坂1丁目10番8号<br/>
                    渋谷道玄坂東急ビル2F−C
                  </td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">電話番号</th>
                  <td className="py-4 px-6 text-muted-foreground">
                    [電話番号]<br/>
                    <span className="text-xs opacity-80">※サービスに関するお問い合わせは、原則としてメールにてお願いいたします。</span>
                  </td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">メールアドレス</th>
                  <td className="py-4 px-6 text-muted-foreground">[連絡先メールアドレス]</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">販売価格</th>
                  <td className="py-4 px-6 text-muted-foreground">料金プランのページにて表示する価格。</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">商品代金以外に必要な料金</th>
                  <td className="py-4 px-6 text-muted-foreground">当サイトのページの閲覧、ソフトウェアのダウンロード等に必要となるインターネット接続料金、通信料金は、お客様のご負担となります。</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">支払方法および支払の時期</th>
                  <td className="py-4 px-6 text-muted-foreground">クレジットカード決済（Stripeによる提供）。支払時期はご利用のカード会社ごとに異なります。</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">商品の引渡時期</th>
                  <td className="py-4 px-6 text-muted-foreground">クレジットカード決済完了後、直ちにご利用いただけます。</td>
                </tr>
                <tr>
                  <th className="py-4 px-6 bg-muted/50 font-medium text-foreground border-r border-border">返品・キャンセルに関する特約</th>
                  <td className="py-4 px-6 text-muted-foreground">サービスの性質上、購入後の返品・返金はお受けできません。<br/>解約はいつでもマイページより行うことができ、次回の請求日より課金が停止されます。</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-sm text-muted-foreground p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p>※上記内容はプレースホルダー（ダミーテキスト）です。本番公開前にお客様の実際の情報に書き換えてください。</p>
          </div>
        </div>
      </div>
    </div>
  )
}
