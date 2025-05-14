export interface SectionItem {
  subtitle?: string
  text: string
}

export interface SectionData {
  title: string
  content: SectionItem[]
}

// Medical record data
export const medicalData: Record<string, SectionData> = {
  complaints: {
    title: "Complaints",
    content: [
      {
        text: "Discomfort after urination.",
      },
    ],
  },
  anamnesis: {
    title: "Medical History",
    content: [
      {
        subtitle: "Disease History",
        text: "Under observation by an oncologist. Diagnosis: Infiltrative cancer of the stomach body, stage IV, peritoneal carcinomatosis, invasion into the greater and lesser omentum, retroperitoneal invasion. Ascites present. Diagnostic laparoscopy performed on 22.11.2022. Undergoing chemotherapy. Under observation by an endocrinologist. Diagnosis: Type 2 diabetes mellitus. Receiving treatment. Under observation by a therapist: Neurocirculatory dystonia (NCD) of hypertensive type. 05.02.2024 — uterus with adnexa (possibly a reference to prior surgery).",
      },
      {
        subtitle: "Life History",
        text: "Past illnesses: Denies tuberculosis and viral hepatitis. No blood transfusions. Injuries and surgeries: Uterus with adnexa removed (possibly a note about surgery). Harmful habits: Denies. Gynecological history: (likely refers to pregnancies and childbirth, though abbreviations are unclear). Family history: Burdened — grandmother had uterine cancer, grandfather had lung cancer.",
      },
      {
        subtitle: "Allergy History",
        text: "No known allergies.",
      },
      {
        subtitle: "Expert Assessment",
        text: "No need for sick leave certificate (ELN).",
      },
      {
        subtitle: "Completed Examinations",
        text: "[no data]",
      },
      {
        subtitle: "Epidemiological History",
        text: "Denies tuberculosis and viral hepatitis. No blood transfusions.",
      },
      {
        subtitle: "Other",
        text: "[no data]",
      },
    ],
  },
  objective: {
    title: "Objective Findings",
    content: [
      {
        text: "Well-built, moderately nourished. Skin and visible mucous membranes are pale pink. Breasts: normal shape, symmetrical, no discharge or masses; no findings on palpation. Breath sounds vesicular, no wheezing. Respiratory rate: 16/min. Heart sounds muffled, rhythmic. Pulse: 72/min. Blood pressure: 110/70 mmHg. Tongue is clean and moist. Abdomen is firm and non-tender on palpation. Liver at the edge of the costal arch. Pasternatsky symptom negative on both sides. Genital status: Normal development. Female-type pubic hair. Vaginal vestibule mucosa: pale pink. External os (O.S): Cervix without visible pathology. Vaginal discharge: leukorrhea, moderate. Bimanual exam: Uterus and adnexa surgically removed. Vaginal stump is immobile and non-tender.",
      },
    ],
  },
  diagnosis: {
    title: "Diagnosis",
    content: [
      {
        text: "Infiltrative cancer of the stomach body, stage IV, peritoneal carcinomatosis. Type 2 diabetes mellitus.",
      },
    ],
  },
}

