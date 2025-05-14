interface VisitBadgeProps {
    isFirstVisit: boolean
  }
  
  export default function VisitBadge({ isFirstVisit }: VisitBadgeProps) {
    return (
      <span className="bg-[#F0F0F0] text-[#666666] px-2 py-1 rounded-full whitespace-nowrap text-xs font-semibold w-fit">
        {isFirstVisit ? "Initial" : "Follow-up"}
      </span>
    )
  }