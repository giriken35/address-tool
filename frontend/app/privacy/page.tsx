import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata = {
  title: 'プライバシーポリシー | 住所データ自動整形ツール',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページへ戻る
        </Link>
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 shadow-sm">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">プライバシーポリシー</h1>
          
          <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none space-y-6">
            <p className="text-muted-foreground">最終更新日：202X年X月X日</p>
            <p>[運営者名/会社名]（以下、「当社」）は、本ウェブサイト上で提供するサービス（以下、「本サービス」）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」）を定めます。</p>
            
            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第1条（個人情報の収集方法）</h2>
              <p>当社は、ユーザーが利用登録をする際に氏名、生年月日、住所、電話番号、メールアドレス、クレジットカード番号などの個人情報をお尋ねすることがあります。また、ユーザーと提携先などとの間でなされたユーザーの個人情報を含む取引記録や決済に関する情報を、当社の提携先（情報提供元、広告主、広告配信先などを含みます。）などから収集することがあります。</p>
            </section>
            
            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第2条（個人情報を収集・利用する目的）</h2>
              <p>当社が個人情報を収集・利用する目的は、以下のとおりです。</p>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
                <li>当社サービスの提供・運営のため</li>
                <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
                <li>ユーザーが利用中のサービスの新機能、更新情報、キャンペーン等及び当社が提供する他のサービスの案内のメールを送付するため</li>
                <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
                <li>利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため</li>
                <li>ユーザーにご自身の登録情報の閲覧や変更、削除、ご利用状況の閲覧を行っていただくため</li>
                <li>有料サービスにおいて、ユーザーに利用料金を請求するため</li>
                <li>上記の利用目的に付随する目的</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第3条（入力データの取り扱い・ゼロリテンション方針）</h2>
              <p>本サービスにおいてユーザーが入力またはAPI経由で送信した住所等のテキストデータ（以下「入力データ」）について、以下の通り「ゼロ・リテンション方式（揮発性処理）」にて取り扱います。</p>
              <ul className="list-disc pl-5 space-y-2 mt-2 text-muted-foreground">
                <li>入力データは、システム内での正規化・ジオコーディング処理の目的にのみ一時的に使用され、処理完了後はサーバーのメモリ上から即座に完全に破棄されます。</li>
                <li>当社は、入力データをデータベース、ログファイル、その他いかなるストレージ・記憶媒体にも永続的・一時的を問わず一切保存・蓄積いたしません。</li>
                <li>システム側で記録・保存する情報は、アカウント情報、APIキー情報、および課金・制限目的の「処理件数（数値）」のメタデータに限定されます。</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第4条（個人情報の第三者提供）</h2>
              <p>当社は、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第5条（プライバシーポリシーの変更）</h2>
              <p>本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。<br/>当社が別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。</p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-foreground mt-8 mb-4">第6条（お問い合わせ窓口）</h2>
              <p>本ポリシーに関するお問い合わせは、下記の窓口までお願いいたします。</p>
              <div className="bg-muted p-4 rounded-lg mt-4 text-muted-foreground">
                <p>住所：[あなたの住所]</p>
                <p>社名：[運営者名/会社名]</p>
                <p>担当部署：[担当部署名]</p>
                <p>Eメールアドレス：[連絡先メールアドレス]</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
