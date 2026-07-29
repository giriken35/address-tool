import Link from "next/link"
import { Map } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1500px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link 
          href="/" 
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-white shadow-sm">
            <Map className="h-4 w-4" />
          </div>
          <span className="text-sm font-bold tracking-tight text-foreground sm:text-base">
            住所データ自動整形ツール
          </span>
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-muted-foreground">
          <Link href="/faq" className="hover:text-foreground transition-colors">
            よくある質問
          </Link>
          <Link href="/contact" className="hover:text-foreground transition-colors">
            お問い合わせ
          </Link>
        </nav>
      </div>
    </header>
  )
}
