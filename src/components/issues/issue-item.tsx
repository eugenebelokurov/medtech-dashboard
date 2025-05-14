import type { Issue } from "../../../data/issues-data"

import { CircleHelp, Sparkles, UserRound } from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function IssueItem({ title, comment, types, lastEditBy, tooltip }: Issue) {
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-[#F6CCCB] text-[#8C2822]"
      case "Non-critical":
        return "bg-[#FCF097] text-[#7D501F]"
      case "Medical":
        return "bg-[#F6CCCB] text-[#8C2822]"
      case "Non-medical":
        return "bg-[#FFBF52] text-[#93420B]"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const renderLastEditIcon = () => {
    if (lastEditBy === "AI") {
      return (
        <div className="bg-[#B6ECFF] rounded-full px-2 py-1">
          <Sparkles className="h-4 w- text-[#0078A4]" />
        </div>
      )
    } else if (lastEditBy === "Human") {
      return (
        <div className="bg-[#F0F0F0] rounded-full px-2 py-1">
          <UserRound className="h-4 w-4 text-[#616161]" />
        </div>
      )
    }
    return null
  }

  return (
    <div className="px-4 py-3 bg-white rounded-[4px] border-l-6 border-1 border-[#B8B8B8]">
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-1">
          <div className="text-sm font-medium">{title}</div>
          <TooltipForIssueItem tooltip={tooltip}>
            <CircleHelp className="h-4 w-4" color="#A3A3A3"/>
          </TooltipForIssueItem>
        </div>
        <div className="w-1 h-1 bg-[#E6E6E6] rounded-full"></div>
        {
          types.map((type, index) => (
            <div key={index} className="flex flex-row items-center gap-2">
              <div className={`${getStatusBgColor(type)} px-2 py-1 rounded-full text-xs font-medium flex items-center`}>
                <p>{type}</p>
              </div>
              {index < types.length - 1 && (
                <div className="w-1 h-1 bg-[#E6E6E6] rounded-full"></div>
              )}
            </div>
          ))
        }
        <div className="w-1 h-1 bg-[#E6E6E6] rounded-full"></div>
        {renderLastEditIcon()}
      </div>
      
      {comment && <div className="text-sm text-gray-500 mt-1">{comment}</div>}
    </div>
  )
}

function TooltipForIssueItem({ children, tooltip }: { children: React.ReactNode; tooltip: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent className="font-medium shadow-[0_2_4px_rgba(0,0,6,0.1) shadow-[0_0_0_1px_rgba(0,0,6,0.1)] px-3 py-2">
          <p className="max-w-[300px]">
            {tooltip}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}