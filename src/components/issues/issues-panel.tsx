"use client"

import { useState } from "react"
import type { IssueGroup } from "../../../data/issues-data"
import { DropdownSection } from "./dropdown-section"
import { IssuesPanelHeader } from "./issues-panel-header"

interface IssuesPanelProps {
  issueGroups: IssueGroup[]
}

export function IssuesPanel({ issueGroups }: IssuesPanelProps) {
  const [forceCollapse, setForceCollapse] = useState(false)

  const handleCollapseAll = () => {
    // Set force collapse to true, then quickly reset it
    setForceCollapse(true)
    setTimeout(() => setForceCollapse(false), 100)
  }

  const handleEdit = () => {
    // Placeholder for edit functionality
    console.log("Edit button clicked")
  }

  return (
    <div className="flex-1 bg-gray-50 overflow-hidden flex flex-col border-l">
      <IssuesPanelHeader onCollapseAll={handleCollapseAll} onEdit={handleEdit} />
      <div className="flex-1 p-3 overflow-y-auto scrollbar-hidden">
        {issueGroups.map((group, index) => (
          <DropdownSection key={index} {...group} forceCollapse={forceCollapse} />
        ))}
      </div>
    </div>
  )
}
