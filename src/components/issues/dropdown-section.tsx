"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { StatusChipNested } from "./status-chip-nested"
import type { IssueGroup } from "../../../data/issues-data"
import { NestedDropdown } from "./nested-dropdown"

interface DropdownSectionProps extends IssueGroup {
  onToggle?: (isOpen: boolean) => void
  forceCollapse?: boolean
}

export function DropdownSection({
  title,
  nestedGroups,
  typeCount,
  defaultOpen = false,
  onToggle,
  forceCollapse,
}: DropdownSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const contentRef = useRef<HTMLDivElement>(null)
  const [contentHeight] = useState<number | undefined>(undefined)

  // Handle force collapse from parent
  useEffect(() => {
    if (forceCollapse) {
      setIsOpen(false)
    }
  }, [forceCollapse])

  // If there are no nested groups, don't render anything
  if (!nestedGroups.length) {
    return null
  }

  const toggleOpen = () => {
    const newState = !isOpen
    setIsOpen(newState)
    if (onToggle) {
      onToggle(newState)
    }
  }

  return (
    <div className="mb-2 border rounded-lg overflow-hidden">
      <div className="flex justify-between items-center bg-gray-100 py-4 px-2 cursor-pointer" onClick={toggleOpen}>
        <div className="flex items-center">
          {isOpen ? <ChevronDown className="h-5 w-5 mr-2" /> : <ChevronRight className="h-5 w-5 mr-2" />}
          <span className="font-medium text-sm">{title}</span>
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
        <div className="px-2 py-2 flex flex-col gap-3">
          {nestedGroups.map((group, index) => (
            <NestedDropdown key={index} {...group} forceCollapse={forceCollapse} />
          ))}
        </div>
      </div>
    </div>
  )
}
