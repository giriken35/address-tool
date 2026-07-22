import { PackageSearch, Mail, Database } from "lucide-react"

export function UseCases() {
  return (
    <section className="mt-16 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl">こんな業務の効率化に最適です</h2>
      </div>
      
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <PackageSearch className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-bold text-foreground">ECサイトの配送手配</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            お客様が入力したバラバラの住所フォーマットを一瞬で統一。配送伝票エラーをなくし、出荷作業をスムーズにします。
          </p>
        </div>
        
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-2/10 text-brand-2">
            <Mail className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-bold text-foreground">DM発送・名寄せ</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            「１丁目２番地」と「1-2」の違いによる重複登録を防止。DMの無駄打ちを減らし、発送コストを削減します。
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
            <Database className="h-6 w-6" />
          </div>
          <h3 className="mb-2 font-bold text-foreground">SFA/CRMのデータ統合</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            営業管理ツールや顧客データベースに取り込む前にサクッとクレンジング。常に綺麗なデータ基盤を維持できます。
          </p>
        </div>
      </div>
    </section>
  )
}
