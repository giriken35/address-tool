import Link from "next/link"

export function UpgradeButton({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <Link 
      href="/checkout"
      className={`${className} flex items-center justify-center transition-transform active:scale-95`}
    >
      {children}
    </Link>
  )
}
