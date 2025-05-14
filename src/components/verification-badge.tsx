import { Sparkles, UserRound } from "lucide-react"

interface VerificationBadgeProps {
  verifiedBy: "AI" | "Human"
}

export default function VerificationBadge({ verifiedBy }: VerificationBadgeProps) {
  if (verifiedBy === "AI") {
    return (
      <span className="bg-[#B6ECFF] text-[#0078A4] px-2 py-1 rounded-full whitespace-nowrap text-xs flex items-center gap-1 w-fit font-semibold">
        <Sparkles className="h-3 w-3" />
        Checked by AI
      </span>
    )
  }

  return (
    <span className="bg-[#F0F0F0] text-[#666666] px-2 py-1 rounded-full whitespace-nowrap text-xs flex flex-row  gap-1 items-center w-fit font-semibold">
      <UserRound className="h-3 w-3" />
      Checked by expert
    </span>
  )
}