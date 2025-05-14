import type { IssueSeverity } from "../../../data/issues-data"

interface StatusChipProps {
  count: number
  type: IssueSeverity
}

export function StatusChip({ count, type }: StatusChipProps) {
  const colorMap = {
    crit: "bg-red-200 text-red-800",
    nonCrit: "bg-yellow-200 text-yellow-800",
    med: "bg-red-200 text-[#A83D37]",
    nonMed: "bg-[#FFBF52] text-[#93420B]",
  }

  const colorMapCount = {
    crit: "bg-[#A83D37] text-[#FFDAD8]",
    nonCrit: "bg-[#7D501F] text-[#FFF5AC]",
    med: "bg-[#A83D37] text-[#FFDAD8]",
    nonMed: "bg-[#93420B] text-[#FFBF52]",
  }

  const typeToLabelMap = {
    crit: "Crit.",
    nonCrit: "Non crit.",
    med: "Med.",
    nonMed: "Non med.",
  }

  return (
    <div className={`${colorMap[type]} pl-1.5 pr-0.5 py-0.5 rounded-[9999px] flex flex-row items-center justify-center text-xs font-medium gap-1`}>
      <p className="whitespace-nowrap font-semibold">{typeToLabelMap[type]}</p> 
      <p className={`${colorMapCount[type]} rounded-full px-1 py-0.5 min-w-6 text-center`}>{count}</p>
    </div>
  )
}
