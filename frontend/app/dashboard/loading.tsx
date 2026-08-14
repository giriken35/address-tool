import { LogOut, CreditCard, Key, User as UserIcon, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Dashboard Header Skeleton */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
              住所データ自動整形ツール
            </Link>
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md font-medium">Dashboard</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* 読み込み中はメールアドレスをグレーのブロックで表現 */}
            <div className="hidden sm:block h-4 w-32 bg-muted rounded animate-pulse"></div>
            <button className="p-2 text-muted-foreground/50 rounded-lg cursor-not-allowed">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Skeleton */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="mb-6">
          <div className="inline-flex items-center text-sm font-medium text-muted-foreground mb-6 opacity-50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            トップページへ戻る
          </div>
          <h1 className="text-2xl font-bold text-foreground">マイページ</h1>
          <p className="text-muted-foreground mt-1">アカウント情報とAPIキーの管理</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Plan Info Card Skeleton */}
          <div className="col-span-1 md:col-span-2 bg-card border border-border rounded-2xl p-6 shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground/30">
                <CreditCard className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <div className="h-5 w-32 bg-muted rounded"></div>
                <div className="h-3 w-20 bg-muted rounded"></div>
              </div>
            </div>
            
            <div className="bg-muted/30 rounded-xl p-5 mb-6 flex-1">
              <div className="flex justify-between items-end mb-3">
                <div className="h-4 w-32 bg-muted rounded"></div>
                <div className="h-5 w-20 bg-muted rounded"></div>
              </div>
              <div className="w-full bg-border rounded-full h-2.5 overflow-hidden">
                <div className="bg-muted h-2.5 rounded-full w-full"></div>
              </div>
              <div className="h-3 w-48 bg-muted rounded mt-4"></div>
            </div>

            <div className="w-full sm:w-[340px] h-11 bg-muted rounded-xl"></div>
          </div>

          {/* Account Profile Skeleton */}
          <div className="col-span-1 bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground/30">
                <UserIcon className="w-5 h-5" />
              </div>
              <h2 className="font-semibold text-lg text-foreground/50">アカウント</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-2">メールアドレス</label>
                <div className="h-4 w-48 bg-muted rounded"></div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-medium block mb-2">ユーザーID</label>
                <div className="h-8 w-full bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* API Key Card Skeleton */}
          <div className="col-span-1 md:col-span-3 bg-card border border-border rounded-2xl p-6 shadow-sm mt-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground/30">
                <Key className="w-5 h-5" />
              </div>
              <div className="space-y-2">
                <h2 className="font-semibold text-lg text-foreground/50">開発者用 APIキー</h2>
                <div className="h-3 w-64 bg-muted rounded"></div>
              </div>
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 h-12 bg-muted rounded-xl"></div>
              <div className="w-[140px] h-12 bg-muted rounded-xl"></div>
            </div>
            <div className="h-3 w-72 bg-muted rounded mt-5"></div>
          </div>

        </div>
      </main>
    </div>
  )
}
