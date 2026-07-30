"use client"

import { useState } from "react"
import { PackageSearch, Mail, Database, MapPin, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface UseCase {
  id: string
  icon: LucideIcon
  title: string
  desc: string
  colorTheme: "brand" | "brand-2" | "blue" | "amber"
}

const USE_CASES: UseCase[] = [
  {
    id: "ec",
    icon: PackageSearch,
    title: "ECサイトの配送手配",
    desc: "お客様が入力したバラバラの住所フォーマットを一瞬で統一。配送伝票エラーをなくし、出荷作業をスムーズにします。",
    colorTheme: "brand"
  },
  {
    id: "dm",
    icon: Mail,
    title: "DM発送・名寄せ",
    desc: "「１丁目２番地」と「1-2」の違いによる重複登録を防止。DMの無駄打ちを減らし、発送コストを削減します。",
    colorTheme: "brand-2"
  },
  {
    id: "crm",
    icon: Database,
    title: "SFA/CRMのデータ統合",
    desc: "営業管理ツールや顧客データベースに取り込む前にサクッとクレンジング。常に綺麗なデータ基盤を維持できます。",
    colorTheme: "blue"
  },
  {
    id: "map",
    icon: MapPin,
    title: "商圏分析・マップ連携",
    desc: "顧客リストをTableau等のBIツールや地図アプリに読み込ませるだけで、日本地図上に一瞬でピンをプロットできます。",
    colorTheme: "amber"
  }
]

export function UseCases() {
  const [activeTab, setActiveTab] = useState<string>("ec")

  const getColorClasses = (theme: UseCase["colorTheme"]) => {
    switch (theme) {
      case "brand":
        return {
          iconBg: "bg-brand/10 text-brand",
          orb: "bg-brand/20",
          activeBorder: "border-brand",
          activeBg: "bg-brand/5",
          hoverBorder: "cursor-pointer hover:border-brand/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(79,70,229,0.4)]"
        }
      case "brand-2":
        return {
          iconBg: "bg-brand-2/10 text-brand-2",
          orb: "bg-brand-2/20",
          activeBorder: "border-brand-2",
          activeBg: "bg-brand-2/5",
          hoverBorder: "cursor-pointer hover:border-brand-2/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(13,148,136,0.4)]"
        }
      case "blue":
        return {
          iconBg: "bg-blue-500/10 text-blue-500",
          orb: "bg-blue-500/20",
          activeBorder: "border-blue-500",
          activeBg: "bg-blue-500/5",
          hoverBorder: "cursor-pointer hover:border-blue-500/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(59,130,246,0.4)]"
        }
      case "amber":
        return {
          iconBg: "bg-amber-500/10 text-amber-500",
          orb: "bg-amber-500/20",
          activeBorder: "border-amber-500",
          activeBg: "bg-amber-500/5",
          hoverBorder: "cursor-pointer hover:border-amber-500/50",
          hoverShadow: "hover:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.4)]"
        }
    }
  }

  return (
    <section className="mt-16 mx-auto max-w-5xl px-4 sm:px-6">
      <div className="text-center mb-10">
        <h2 className="text-xl font-bold text-foreground sm:text-2xl mb-4">こんな業務の効率化に最適です</h2>
        <p className="text-sm text-muted-foreground font-medium">
          ▼ 各カードをクリックして詳細をチェック
        </p>
      </div>
      
      {/* Tabs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {USE_CASES.map(({ id, icon: Icon, title, desc, colorTheme }) => {
          const colors = getColorClasses(colorTheme)
          const isActive = activeTab === id
          
          return (
            <div
              key={id}
              tabIndex={0}
              onClick={() => setActiveTab(id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActiveTab(id)
                }
              }}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 outline-none ${colors.hoverBorder} ${colors.hoverShadow} ${
                isActive ? `${colors.activeBorder} ${colors.activeBg} shadow-sm -translate-y-1` : 'border-border bg-card hover:-translate-y-1'
              }`}
              style={{ cursor: "pointer" }}
              onTouchStart={() => {}}
            >
              <div className="p-5">
                <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${colors.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-bold text-foreground text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed hidden sm:block">
                  {desc}
                </p>
              </div>
              <div
                className={`pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full blur-2xl transition-opacity duration-300 ${
                  isActive ? `opacity-100 ${colors.orb}` : `opacity-0 group-hover:opacity-100 ${colors.orb}`
                }`}
              />
            </div>
          )
        })}
      </div>

      {/* Tab Content Area */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        {activeTab === "ec" && (
          <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <PackageSearch className="h-5 w-5 text-brand" />
              ECサイトの配送伝票エラーを防止
            </h3>
            <div className="bg-surface/50 rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-6 border-b md:border-b-0 md:border-r border-border">
                  <div className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    ユーザーの入力（表記ゆれ・エラー原因）
                  </div>
                  <div className="space-y-3">
                    <div className="p-3 bg-background rounded-lg border border-destructive/20 text-sm font-mono line-through text-muted-foreground">東京都　港区芝公園４ー２ー８</div>
                    <div className="p-3 bg-background rounded-lg border border-destructive/20 text-sm font-mono line-through text-muted-foreground">東京都港区芝公園4丁目2-8</div>
                    <div className="p-3 bg-background rounded-lg border border-destructive/20 text-sm font-mono line-through text-muted-foreground">東京都港区芝公園 ４−２−８</div>
                  </div>
                </div>
                <div className="p-6 bg-brand/5 relative">
                  <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-brand text-brand-foreground shadow-lg">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                  <div className="text-sm font-semibold text-brand mb-4 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    APIによる一括正規化（伝票フォーマット）
                  </div>
                  <div className="h-full flex flex-col justify-center space-y-3">
                    <div className="p-4 bg-background rounded-lg border border-brand/30 text-sm font-mono text-foreground font-medium shadow-sm flex items-center justify-between">
                      <span>東京都港区芝公園4-2-8</span>
                      <span className="text-xs text-brand bg-brand/10 px-2 py-1 rounded">クレンジング済</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-4 text-center">
                      全角スペースやハイフンの揺れを瞬時に補正。<br/>ヤマト運輸や佐川急便の伝票システムへそのまま流し込めます。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "dm" && (
          <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-brand-2" />
              名寄せによる重複発送（コストの無駄）を削減
            </h3>
            <div className="bg-surface/50 rounded-xl border border-border p-6 overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-border/50 text-muted-foreground">
                    <th className="pb-3 pr-6 font-medium">顧客ID</th>
                    <th className="pb-3 pr-6 font-medium">氏名</th>
                    <th className="pb-3 pr-6 font-medium">登録住所 (元データ)</th>
                    <th className="pb-3 pr-6 font-medium">正規化後住所 (判定キー)</th>
                    <th className="pb-3 font-medium text-center">判定</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  <tr>
                    <td className="py-4 pr-6 text-muted-foreground font-mono">C-1042</td>
                    <td className="py-4 pr-6">山田 太郎</td>
                    <td className="py-4 pr-6">大阪府大阪市北区梅田１丁目１番地</td>
                    <td className="py-4 pr-6 font-mono font-medium text-brand-2">大阪府大阪市北区梅田1-1</td>
                    <td className="py-4 text-center"><span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">新規</span></td>
                  </tr>
                  <tr className="bg-destructive/5">
                    <td className="py-4 pr-6 text-muted-foreground font-mono">C-1088</td>
                    <td className="py-4 pr-6">山田 太郎</td>
                    <td className="py-4 pr-6">大阪府大阪市北区梅田 1-1</td>
                    <td className="py-4 pr-6 font-mono font-medium text-brand-2">大阪府大阪市北区梅田1-1</td>
                    <td className="py-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive border border-destructive/20">
                        <AlertCircle className="h-3 w-3" />
                        重複警告
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-6 flex justify-end">
                <p className="text-xs text-muted-foreground">
                  表記違いによる「同一人物への複数回送付」を事前に検知し、DM発送コストを大幅に削減します。
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "crm" && (
          <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              SFA/CRM連携前のデータ自動クレンジング
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-xl overflow-hidden border border-border bg-[#0d1117]">
                <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
                  </div>
                  <span className="text-xs text-[#8b949e] font-mono ml-2">Request (JSON)</span>
                </div>
                <div className="p-4 text-sm font-mono text-[#e6edf3] overflow-x-auto">
                  <pre>
<span className="text-[#ff7b72]">POST</span> /api/v1/normalize
<span className="text-[#ff7b72]">Content-Type:</span> application/json

{`{`}
{`  "address": "北海道札幌市中央区北1条西２丁目"`}
{`}`}
                  </pre>
                </div>
              </div>
              <div className="rounded-xl overflow-hidden border border-border bg-[#0d1117] relative">
                <div className="absolute top-1/2 -left-6 -translate-y-1/2 hidden md:flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-white z-10">
                  <ArrowRight className="h-4 w-4" />
                </div>
                <div className="bg-[#161b22] px-4 py-2 border-b border-[#30363d] flex items-center">
                  <span className="text-xs text-[#8b949e] font-mono">Response (JSON)</span>
                </div>
                <div className="p-4 text-sm font-mono text-[#e6edf3] overflow-x-auto">
                  <pre>
{`{`}
{`  "pref": "北海道",`}
{`  "city": "札幌市中央区",`}
{`  "town": "北一条西2丁目",`}
{`  "lat": 43.062095,`}
{`  "lng": 141.354378`}
{`}`}
                  </pre>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">
              SalesforceやHubSpotなどのAPIに繋ぐ前に中継させるだけで、住所データを自動で構造化。<br/>都道府県・市区町村レベルでの正確なセグメント配信や分析が可能になります。
            </p>
          </div>
        )}

        {activeTab === "map" && (
          <div className="p-6 sm:p-10 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-amber-500" />
              ジオコーディングで顧客分布を瞬時に可視化
            </h3>
            <div className="bg-surface/50 rounded-xl border border-border overflow-hidden p-6 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <MapPin className="h-32 w-32" />
              </div>
              <div className="relative z-10 max-w-lg mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 p-3 bg-background rounded border border-border shadow-sm text-sm">
                    <span className="text-muted-foreground mr-2">住所:</span>
                    <span className="font-mono">愛知県名古屋市中区栄3-1-1</span>
                  </div>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="h-10 w-px bg-amber-500/30"></div>
                </div>
                <div className="flex justify-center mb-6">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-600 border border-amber-500/20">
                    <Database className="h-3 w-3" />
                    自動ジオコーディング
                  </span>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="h-10 w-px bg-amber-500/30"></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg border border-amber-500/20 shadow-sm flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-1">緯度 (Latitude)</span>
                    <span className="text-lg font-mono font-medium text-amber-600">35.1685</span>
                  </div>
                  <div className="p-4 bg-background rounded-lg border border-amber-500/20 shadow-sm flex flex-col items-center">
                    <span className="text-xs text-muted-foreground mb-1">経度 (Longitude)</span>
                    <span className="text-lg font-mono font-medium text-amber-600">136.9042</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-6 text-center">
              表記ゆれの修正と同時に、高精度な緯度・経度データを自動付与。<br/>TableauなどのBIツールに読み込ませるだけで、地図上への正確なプロットが即座に完了します。
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
