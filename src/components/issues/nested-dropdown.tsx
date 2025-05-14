"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { StatusChipNested } from "./status-chip-nested"
import type { NestedIssueGroup } from "../../../data/issues-data"
import { IssueItem } from "./issue-item"

interface NestedDropdownProps extends NestedIssueGroup {
  forceCollapse?: boolean
}

export function NestedDropdown({
  title,
  issues,
  typeCount,
  defaultOpen = false,
  forceCollapse,
}: NestedDropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined)

  // Handle force collapse from parent
  useEffect(() => {
    if (forceCollapse) {
      setIsOpen(false)
    }
  }, [forceCollapse])

  // Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(isOpen ? contentRef.current.scrollHeight : 0)
    }
  }, [isOpen])

  // If there are no issues, don't render anything
  if (!issues.length) {
    return null
  }

  return (
    <div className="mb-1">
      <div
        className="flex justify-between items-center bg-gray-50 cursor-pointer rounded mb-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          {isOpen ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
          <span className="text-sm">{title}</span>
        </div>
        <div className="flex space-x-1">
          {typeCount["Medical"] > 0 && <StatusChipNested count={typeCount["Medical"]} type="med" />}
          {typeCount["Non-medical"] > 0 && <StatusChipNested count={typeCount["Non-medical"]} type="nonMed" />}
          {typeCount["Critical"] > 0 && <StatusChipNested count={typeCount["Critical"]} type="crit" />}
          {typeCount["Non-critical"] > 0 && <StatusChipNested count={typeCount["Non-critical"]} type="nonCrit" />}
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: contentHeight ? `${contentHeight}px` : isOpen ? "1000px" : "0px" }}
      >
        <div className="flex flex-col gap-2">
          {issues.map((issue, index) => (
            <IssueItem key={index} {...issue} />
          ))}
        </div>
      </div>
    </div>
  )
}
