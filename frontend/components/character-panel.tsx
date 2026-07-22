import { Sparkles } from "lucide-react"
import { AdSlot, ADMAX_HTML } from "@/components/ad-slot"

interface CharacterPanelProps {
  side: "left" | "right"
  name: string
  role: string
}

/**
 * 両サイドのキャラクターイラスト用プレースホルダー。
 * 画像を差し込む場合は下記 <img> をアンコメントして src を差し替えてください。
 */
export function CharacterPanel({ side, name, role }: CharacterPanelProps) {
  return (
    <div className="sticky top-6">
      {/* admax 広告 */}
      <div className="overflow-hidden rounded-3xl border border-border bg-card/50 p-3 backdrop-blur-sm">
        <p className="mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-muted-foreground/70">
          Sponsored
        </p>
        <AdSlot html={ADMAX_HTML} height={250} title={`admax 広告 (${side})`} />
      </div>
    </div>
  )
}
