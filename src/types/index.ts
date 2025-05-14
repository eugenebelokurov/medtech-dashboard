export interface Protocol {
    id: number
    specialty: string
    quality: string
    defects: {
      crit?: number
      nonCrit?: number
      med?: number
      nonMed?: number
    }
    receptionDate: string
    isFirstVisit: boolean
    diagnosis: string
    clinicId: string
    lastModifiedDate: string
    verifiedBy: "AI" | "Human"
  }
  