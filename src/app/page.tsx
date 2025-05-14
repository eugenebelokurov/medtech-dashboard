"use client"

import { useState, useCallback } from "react"
import Header from "../components/header"
import Filters from "../components/filters"
import ProtocolsTable from "../components/protocols-table"
import type { Protocol } from "../types"

// Mock data for the protocols
import { allProtocols } from "../../data/protocols"

export default function QualityControlSystemPage() {
  const [filteredProtocols, setFilteredProtocols] = useState<Protocol[]>(allProtocols)

  // Apply filters function - using useCallback to prevent recreation on every render
  const applyFilters = useCallback(
    (filters: {
      specialty: string[]
      diagnosis: { condition: "contains" | "notContains"; value: string }
      quality: string[]
      defects: string[]
      receptionDate: { from: string; to: string }
      clinicId: string[]
      lastModified: { from: string; to: string }
    }) => {
      let filtered = [...allProtocols]

      // Filter by specialty
      if (filters.specialty.length > 0) {
        filtered = filtered.filter((protocol) => filters.specialty.includes(protocol.specialty))
      }

      // Filter by diagnosis
      if (filters.diagnosis.value) {
        if (filters.diagnosis.condition === "contains") {
          filtered = filtered.filter((protocol) =>
            protocol.diagnosis.toLowerCase().includes(filters.diagnosis.value.toLowerCase()),
          )
        } else {
          filtered = filtered.filter(
            (protocol) => !protocol.diagnosis.toLowerCase().includes(filters.diagnosis.value.toLowerCase()),
          )
        }
      }

      // Filter by quality
      if (filters.quality.length > 0) {
        filtered = filtered.filter((protocol) => filters.quality.includes(protocol.quality))
      }

      // Filter by defects
      if (filters.defects.length > 0) {
        filtered = filtered.filter((protocol) => {
          if (filters.defects.includes("Critical") && protocol.defects.crit) return true
          if (filters.defects.includes("Non-critical") && protocol.defects.nonCrit) return true
          if (filters.defects.includes("Medical") && protocol.defects.med) return true
          if (filters.defects.includes("Non-medical") && protocol.defects.nonMed) return true
          return false
        })
      }

      // Filter by clinic ID
      if (filters.clinicId.length > 0) {
        filtered = filtered.filter((protocol) => filters.clinicId.includes(protocol.clinicId))
      }

      // Note: Date filtering would require proper date parsing for the Russian date strings
      // This is a simplified implementation

      setFilteredProtocols(filtered)
    },
    [],
  ) // Empty dependency array since allProtocols is static

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-medium">Quality control</h1>
          <div className="text-sm text-gray-600">Last updated: 27 March 2025, 21:51</div>
        </div>

        <Filters onFiltersChange={applyFilters} />

        <div className="mb-4">
          <p className="text-sm font-semibold">
            Protocols: {filteredProtocols.length} of {allProtocols.length}
          </p>
        </div>

        <ProtocolsTable protocols={filteredProtocols} />
      </main>
    </div>
  )
}