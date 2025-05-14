"use client"

import { useState } from "react"

import { ChevronDown, Edit } from "lucide-react"

import { Button } from "../ui/button"

interface IssuesPanelHeaderProps {
  onCollapseAll: () => void
  onEdit: () => void
}

export function IssuesPanelHeader({ onCollapseAll, onEdit }: IssuesPanelHeaderProps) {
  const [ pressed, setPressed ] = useState(false)



  return (
    <div className="flex justify-between items-center p-3 border-b">
      <h2 className="font-medium text-sm">Assessment results</h2>
      <div className="flex space-x-1">
        <Button variant="ghost" className="" 
                onClick={onCollapseAll}
                onMouseDown={() => setPressed(true)}
                onMouseUp={() => setPressed(false)}
        >
          <span className={`lex flex-col transition-all duration-150 ease-in-out ${pressed ? "-space-y-[6px]" : "-space-y-[3px]"}`}>
            <ChevronDown className="!h-3 !w-3" strokeWidth={3}/>
            <ChevronDown className="!h-3 !w-3 rotate-180" strokeWidth={3}/>
          </span>
          {/* <ChevronsDownUp className="h-4 w-4" />  */}
          Collapse
        </Button>
        <Button variant="ghost" className="" onClick={onEdit}>
          <Edit className="h-4 w-4" /> 
          Edit
        </Button>
      </div>
    </div>
  )
}
