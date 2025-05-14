import type { PatientInfo } from "../../data/patient-info"
import { StatusChip } from "../components/issues/status-chip"

import { Button } from "./ui/button";

import { Mail } from 'lucide-react';

interface PatientHeaderProps {
  patientInfo: PatientInfo
}

export function PatientHeader({ patientInfo }: PatientHeaderProps) {
  const getStatusBgColor = (status: string) => {
    switch (status) {
      case "low":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      case "high":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="bg-white border-b py-2 px-4 flex text-sm">
      <div className="flex flex-row justify-between items-center w-full">
        <div className="flex items-start space-x-4 w-full">
          <SectionElement title=" Protocol ID" value={patientInfo.protocolId} />
          <div className="border-r h-10"></div>

          <SectionElement title="Patient ID" value={patientInfo.patientId} />
          <SectionElement title="Age" value={patientInfo.age} />
          <SectionElement title="Sex" value={patientInfo.gender} />
          
          <div className="border-r h-10"></div>

          <SectionElement title="Appointment date" value={patientInfo.appointmentDate} />

          <div className="flex flex-col">
            <SectionHeader title="Appointment type" />
            <div className="bg-[#F0F0F0] rounded-[9999] py-1 px-2 max-w-fit">
              <p className="text-xs text-[#666666] font-semibold ">{patientInfo.appointmentType}</p>
            </div>
          </div>

          <SectionElement title="Clinic ID" value={patientInfo.clinicId} />

          <SectionElement title="Speciality" value={patientInfo.specialty} />
          <div className="border-r h-10"></div>

          <div className="flex flex-col">
            <SectionHeader title="AI assessment" />
            <div className={`${getStatusBgColor(patientInfo.aiVerificationResult.status)} py-1 px-2 rounded-full text-xs max-w-fit font-semibold`}>
              <p>{patientInfo.aiVerificationResult.text}</p>
            </div>
          </div>

          <div className="flex flex-col">
            <SectionHeader title="Issues" />
            <div className="flex items-center space-x-1">
              <StatusChip count={5} type="crit" />
              <StatusChip count={10} type="nonCrit" />
              <StatusChip count={7} type="med" />
              <StatusChip count={14} type="nonMed" />
            </div>
          </div>
        </div>

        <Button variant="ghost" className="flex items-center text-blue-600 font-medium">
          <Mail className="h-4 w-4 mr-1"/>
            <p className="whitespace-nowrap">Get report</p>
        </Button>
      </div>
    </div>
  )
}

function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-gray-500 text-xs font-medium whitespace-nowrap">
      {title}
    </div>
  )
}

function SectionElement({title, value} : {title: string, value: string}) {
  return (
    <div className="flex flex-col">
      <SectionHeader title={title} />
      <p className="whitespace-nowrap">{value}</p>
    </div>
  )
}