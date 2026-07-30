import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: '利用規約 | 住所データ自動整形ツール',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページへ戻る
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">利用規約</h1>
          
          <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">最終更新日：202X年X月X日</p>
            
            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第1条（適用）</h2>
              <p>本規約は、ユーザーと[運営者名/会社名]（以下、「当社」）との間の、本サービスの利用に関わる一切の関係に適用されるものとします。</p>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第2条（禁止事項）</h2>
              <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>不正アクセスをし、またはこれを試みる行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
                <li>その他、当社が不適切と判断する行為</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第3条（本サービスの提供の停止等）</h2>
              <p>当社は、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。</p>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合</li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他、当社が本サービスの提供が困難と判断した場合</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第4条（免責事項）</h2>
              <p>当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。<br/>
              当社は、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。<br/>
              本サービスによる住所の正規化・ジオコーディング結果の正確性、完全性、最新性について、当社はいかなる保証も行いません。</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第5条（サービス内容の変更等）</h2>
              <p>当社は、ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによってユーザーに生じた損害について一切の責任を負いません。</p>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第6条（利用規約の変更）</h2>
              <p>当社は、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第7条（準拠法・裁判管轄）</h2>
              <p>本規約の解釈にあたっては、日本法を準拠法とします。<br/>本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意管轄とします。</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
