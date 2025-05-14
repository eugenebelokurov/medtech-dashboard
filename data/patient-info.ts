export interface PatientInfo {
  protocolId: string
  patientId: string
  age: string
  gender: string
  appointmentDate: string
  appointmentType: string
  clinicId: string
  specialty: string
  aiVerificationResult: {
    text: string
    status: "low" | "medium" | "high"
  }
}

export const patientInfo: PatientInfo = {
  protocolId: "0126060",
  patientId: "62",
  age: "62 yoe",
  gender: "female",
  appointmentDate: "15 May, 2025",
  appointmentType: "Initial",
  clinicId: "KL-1010",
  specialty: "Gynecologist",
  aiVerificationResult: {
    text: "Average quality",
    status: "medium",
  },
}
