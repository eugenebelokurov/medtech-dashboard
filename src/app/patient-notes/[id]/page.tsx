"use client"

import { useState } from "react"
import { PatientHeader } from "@/components/patient-header"
import { SearchBar } from "@/components/search-bar"
import { MedicalSection } from "@/components/medical-section"
import { IssuesPanel } from "@/components/issues/issues-panel"
import { patientInfo } from "../../../../data/patient-info"
import { medicalData } from "../../../../data/medical-record"
import { issuesData } from "../../../../data/issues-data"

import React from "react"


export default function MedicalRecordInterface() {
  const [searchTerm, setSearchTerm] = useState("")

  // Medical record data

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Patient info header */}
      <PatientHeader patientInfo={patientInfo} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-1/2 p-4 overflow-y-auto bg-gray-50 scrollbar-hidden">
          {/* Search bar */}
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Medical record sections */}
          <MedicalSection
            title={medicalData.complaints.title}
            data={medicalData.complaints.content}
            searchTerm={searchTerm}
          />
          <MedicalSection
            title={medicalData.anamnesis.title}
            data={medicalData.anamnesis.content}
            defaultOpen={true}
            searchTerm={searchTerm}
          />
          <MedicalSection
            title={medicalData.objective.title}
            data={medicalData.objective.content}
            searchTerm={searchTerm}
          />
          <MedicalSection
            title={medicalData.diagnosis.title}
            data={medicalData.diagnosis.content}
            searchTerm={searchTerm}
          />
        </div>

        {/* Right panel */}
        <IssuesPanel issueGroups={issuesData} />
      </div>
    </div>
  )
}
