"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react";
import type { SectionItem } from "../../data/medical-record";
import { highlightSearchTerms } from "../../utils/text-utils";

import { ViewSwitch } from "./view-switch"

interface MedicalSectionProps {
  title: string
  data: SectionItem[]
  defaultOpen?: boolean
  searchTerm: string
}

export function MedicalSection({ title, data, defaultOpen = false, searchTerm }: MedicalSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [viewMode, setViewMode] = useState<"list" | "document">("document")

  // Check if this section has any content that matches the search term
  const hasMatch = searchTerm
    ? data.some(
        (item) =>
          (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
          item.text.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : true

  // If there's a search term and no matches, don't render this section
  if (searchTerm && !hasMatch) {
    return null
  }

  return (
    <div className="mb-4 border rounded-lg overflow-hidden bg-white shadow-[0px_2px_3px_-1px_hsla(0,0%,0%,0.04)]">
      <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div className="flex items-center">
          {isOpen ? <ChevronDown className="h-5 w-5 mr-2" /> : <ChevronRight className="h-5 w-5 mr-2" />}
          <span className="font-medium text-sm">{title}</span>
        </div>
        <ViewSwitch activeView={viewMode} onChange={setViewMode} />
      </div>

      {isOpen && (
        <div className="border-t">
          {data.map((item, index) => {
            // Check if this item matches the search term
            const itemHasMatch = searchTerm
              ? (item.subtitle && item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())) ||
                item.text.toLowerCase().includes(searchTerm.toLowerCase())
              : true

            // If there's a search term and no match in this item, don't render it
            if (searchTerm && !itemHasMatch) {
              return null
            }

            return (
              <div
                key={index}
                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} ${index > 0 ? "border-t" : ""}`}
              >
                <div className="p-4 flex">
                  {item.subtitle && <div className="w-40 text-gray-600 flex-shrink-0 text-sm">{item.subtitle}</div>}
                  <div className="flex-1 text-sm">{searchTerm ? highlightSearchTerms(item.text, searchTerm) : item.text}</div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
