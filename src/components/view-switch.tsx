"use client"

import { List, FileText } from "lucide-react"

interface ViewSwitchProps {
  activeView: "list" | "document"
  onChange: (view: "list" | "document") => void
}

export function ViewSwitch({ activeView, onChange }: ViewSwitchProps) {
  return (
    <div className="flex border rounded-md overflow-hidden">
      <button
        className={`p-1.5 ${
          activeView === "list" ? "bg-white" : "bg-gray-100"
        } border-r flex items-center justify-center w-10`}
        onClick={() => onChange("list")}
      >
        <List className="h-4 w-4 text-gray-600" />
      </button>
      <button
        className={`p-1.5 ${
          activeView === "document" ? "bg-white" : "bg-gray-100"
        } flex items-center justify-center w-10`}
        onClick={() => onChange("document")}
      >
        <FileText className="h-4 w-4 text-gray-600" />
      </button>
    </div>
  )
}
