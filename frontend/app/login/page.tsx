'use client'

import { useState } from 'react'
import { login, signup } from './actions'
import { ArrowLeft, Mail, Lock, Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    
    try {
      const action = isLogin ? login : signup
      const result = await action(formData)
      
      if (result?.error) {
        setError(result.error)
        setLoading(false)
      }
      // If successful, the action will trigger a redirect to /dashboard
    } catch (e) {
      console.error(e)
      setError("エラーが発生しました。")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <Link href="/" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          トップページへ戻る
        </Link>
        <h2 className="text-center text-3xl font-bold tracking-tight text-foreground">
          {isLogin ? 'ログイン' : '新規アカウント作成'}
        </h2>
        <p className="mt-2 text-center text-sm text-muted-foreground">
          {isLogin ? 'アカウントをお持ちでない方は' : 'すでにアカウントをお持ちの方は'}
          <button 
            onClick={() => {
              setIsLogin(!isLogin)
              setError(null)
            }}
            className="font-medium text-brand hover:text-brand/80 ml-1 transition-colors"
          >
            {isLogin ? 'こちらから新規登録' : 'こちらからログイン'}
          </button>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-card py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border sm:rounded-2xl sm:px-10">
          <form action={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">
                メールアドレス
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand bg-background text-foreground sm:text-sm transition-shadow"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground">
                パスワード
              </label>
              <div className="mt-2 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  required
                  minLength={6}
                  className="block w-full pl-10 pr-3 py-2.5 border border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand bg-background text-foreground sm:text-sm transition-shadow"
                  placeholder="6文字以上のパスワード"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
                {error}
                {!isLogin && error.includes('Email link') && (
                  <span className="block mt-1">※Supabaseの管理画面でEmail confirmation設定をOFFにするか、確認メールのリンクをクリックしてください。</span>
                )}
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand disabled:opacity-70 disabled:cursor-not-allowed transition-all"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLogin ? 'ログイン' : 'アカウントを作成')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
