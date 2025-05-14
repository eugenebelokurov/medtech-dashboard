"use client"

import type React from "react"

import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"

import type { Protocol } from "../types"
import QualityBadge from "./quality-badge"
import VisitBadge from "./visit-badge"
import VerificationBadge from "./verification-badge"
import DefectChips from "./defect-chips"


interface ProtocolsTableProps {
  protocols: Protocol[]
}

export default function ProtocolsTable({ protocols }: ProtocolsTableProps) {
  const router = useRouter()
  const [isSelecting, setIsSelecting] = useState(false)

  // Track when user starts selecting text
  useEffect(() => {
    const handleMouseDown = () => {
      setIsSelecting(false)
    }

    const handleSelectionChange = () => {
      if (window.getSelection()?.toString()) {
        setIsSelecting(true)
      }
    }

    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("selectionchange", handleSelectionChange)

    return () => {
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("selectionchange", handleSelectionChange)
    }
  }, [])

  // Handle row click - navigate only if not selecting text
  const handleRowClick = (protocolId: number) => (e: React.MouseEvent) => {
    // If user is selecting text, don't navigate
    if (isSelecting || window.getSelection()?.toString()) {
      return
    }

    // If user clicked on a button or interactive element, don't navigate
    if (
      e.target instanceof HTMLElement &&
      (e.target.tagName === "BUTTON" || e.target.tagName === "A" || e.target.closest("button") || e.target.closest("a"))
    ) {
      return
    }

    // Navigate to protocol detail page
    router.push(`/patient-notes/${protocolId}`)
  }

  return (
    <div className="overflow-hidden">
      <table className="w-full text-sm">
        <thead className="text-[#7B7B7B] border-b border-[#E5E7EB]">
          <tr className="">
            <th className="py-3 px-3 text-left font-semibold">Protocol ID</th>
            <th className="py-3 px-3 text-left font-semibold">Specialty</th>
            <th className="py-3 px-3 text-left font-semibold">Diagnosis</th>
            <th className="py-3 px-3 text-left font-semibold">Review Result</th>
            <th className="py-3 px-3 text-left font-semibold">Number of Defects</th>
            <th className="py-3 px-3 text-left font-semibold">Appointment Date</th>
            <th className="py-3 px-3 text-left font-semibold">Clinic ID</th>
            <th className="py-3 px-3 text-left font-semibold">Last Modified</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB]">
          {protocols.map((protocol) => (
            <tr 
              key={protocol.id} 
              className="hover:bg-gray-50 cursor-pointer"
              onClick={handleRowClick(protocol.id)}
            >
              <td className="py-3 px-3">{protocol.id}</td>
              <td className="py-3 px-3">{protocol.specialty}</td>
              <td className="py-3 px-3">{protocol.diagnosis}</td>
              <td className="py-3 px-3">
                <QualityBadge quality={protocol.quality} />
              </td>
              <td className="py-3 px-3">
                <DefectChips defects={protocol.defects} />
              </td>
              <td className="py-3 px-3">
                <div className="flex flex-col gap-1">
                  <span>{protocol.receptionDate}</span>
                  <VisitBadge isFirstVisit={protocol.isFirstVisit} />
                </div>
              </td>
              <td className="py-3 px-3">{protocol.clinicId}</td>
              <td className="py-3 px-3">
                <div className="flex flex-col gap-1">
                  <span>{protocol.lastModifiedDate}</span>
                  <VerificationBadge verifiedBy={protocol.verifiedBy} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
