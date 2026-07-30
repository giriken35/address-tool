import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { LogOut, Key, Database, CreditCard, User as UserIcon } from 'lucide-react'
import Link from 'next/link'

export const metadata = {
  title: 'マイページ | 住所データ自動整形ツール',
}

export default async function DashboardPage() {
  const supabase = await createClient()

  // セッションの確認
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error || !user) {
    redirect('/login')
  }

  // 今月の利用件数を取得
  const startOfMonth = new Date()
  startOfMonth.setDate(1)
  startOfMonth.setHours(0, 0, 0, 0)
  
  const { data: usageData } = await supabase
    .from('usage_logs')
    .select('rows_processed')
    .gte('created_at', startOfMonth.toISOString())
    
  let used = 0
  if (usageData) {
    used = usageData.reduce((acc, row) => acc + row.rows_processed, 0)
  }
  const progressPercent = Math.min(100, Math.round((used / 100) * 100))

  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
              住所データ自動整形ツール
            </Link>
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground hidden sm:block">
              {user.email}
            </div>
            <form action="/auth/signout" method="post">
              <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors">
                <LogOut className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
          <p className="text-muted-foreground mt-1">アカウント情報とAPIキーの管理</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Plan Info Card */}
          <div className="col-span-1 md:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">現在のご利用プラン</h2>
                <p className="text-sm text-muted-foreground">Freeプラン</p>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-xl p-5 mb-6 flex-1">
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-medium">今月のAPI/CSV処理件数</span>
                <span className="text-sm"><strong className="text-lg">{used}</strong> / 100 件</span>
              </div>
              <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                <div className="bg-blue-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-3">毎月1日にリセットされます。</p>
            </div>

            <button className="w-full sm:w-auto py-2.5 px-6 bg-brand hover:bg-brand/90 text-white rounded-xl font-medium transition-colors text-sm shadow-sm">
              無制限のProプランにアップグレード (¥5,000/月)
            </button>
          </div>

          {/* Account Profile */}
          <div className="col-span-1 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                <UserIcon className="w-5 h-5" />
              </div>
              <h2 className="font-semibold text-lg">アカウント</h2>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1">メールアドレス</label>
                <div className="text-sm font-medium">{user.email}</div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-1">ユーザーID</label>
                <div className="text-xs font-mono bg-muted p-2 rounded-lg text-muted-foreground break-all">
                  {user.id}
                </div>
              </div>
            </div>
          </div>

          {/* API Key Card */}
          <div className="col-span-1 md:col-span-3 bg-card border border-border rounded-2xl p-6 shadow-sm mt-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-semibold text-lg">開発者用 APIキー</h2>
                <p className="text-sm text-muted-foreground">自社システムやCRMから正規化APIを呼び出すためのキーです。</p>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  readOnly 
                  value="sk_test_********************************" 
                  className="w-full bg-muted border border-border rounded-xl py-3 px-4 text-sm font-mono text-muted-foreground focus:outline-none"
                />
              </div>
              <button className="py-3 px-6 bg-secondary hover:bg-secondary/80 text-foreground border border-border rounded-xl font-medium transition-colors text-sm whitespace-nowrap">
                キーを生成する
              </button>
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-1.5">
              <Database className="w-4 h-4" />
              ※APIキーの発行と実稼働はProプラン限定の機能となります。
            </p>
          </div>

        </div>
      </main>
    </div>
  )
}
