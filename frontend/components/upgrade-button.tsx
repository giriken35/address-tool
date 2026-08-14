import Link from "next/link"

export function UpgradeButton({ className, children }: { className?: string, children: React.ReactNode }) {
  return (
    <Link 
      href="/checkout"
      className={`${className} flex items-center justify-center`}
    >
      {children}
    </Link>
  )
}
