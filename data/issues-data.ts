export type IssueSeverity = "crit" | "nonCrit" | "med" | "nonMed"

export type IssueType = "Critical" | "Non-critical" | "Medical" | "Non-medical"

export type IssueLastEditBy = "AI" | "Human"

export interface IssueTypeCount {
  "Critical": number;
  "Non-critical": number;
  "Medical": number;
  "Non-medical": number;
}

export interface Issue {
  title: string
  types: IssueType[]
  tooltip: string
  lastEditBy: IssueLastEditBy
  comment?: string
}

export interface NestedIssueGroup {
  title: string
  issues: Issue[]
  typeCount: IssueTypeCount
  defaultOpen?: boolean
}

export interface IssueGroup {
  title: string
  nestedGroups: NestedIssueGroup[]
  typeCount: IssueTypeCount
  defaultOpen?: boolean
}

export const issuesData: IssueGroup[] = [
  {
    title: "Description of complaints and medical history",
    typeCount: {
      "Critical": 2,
      "Non-critical": 1,
      "Medical": 0,
      "Non-medical": 0,
    },
    defaultOpen: true,
    nestedGroups: [
      {
        title: "Complaints",
        defaultOpen: true,
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Complaints collected are incomplete",
            comment: "Patient's complaints about discomfort after urination need to be detailed",
            types: ["Critical", "Medical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic), including reasons such as getting a prescription or referral, and there is missing info for all items:",
            lastEditBy: "AI",
          },
          {
            title: "Primary complaint does not match the main diagnosis",
            comment: "Specify complaints relevant to the main diagnosis",
            types: ["Non-critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic), including reasons such as...",
            lastEditBy: "Human",
          },
        ],
      },
      {
        title: "History of present illness",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        defaultOpen: true,
        issues: [
          {
            title: "History contains abbreviations",
            comment: "Abbreviations found: SG, NCD, NAM",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
          {
            title: "History collected is incomplete",
            comment: "Details of disease progression need clarification",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
      {
        title: "Allergic history",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Allergic history collected correctly",
            comment: "Information is complete",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
      {
        title: "Epidemiological history",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Epidemiological history collected correctly",
            comment: "Information is complete",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
      {
        title: "Life history",
        typeCount: {
          "Critical": 2,
          "Non-critical": 1,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Life history contains abbreviations",
            comment: "It is recommended to decode abbreviations in the gynecological history",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
    ],
  },
  {
    title: "Physical examination",
    typeCount: {
      "Critical": 2,
      "Non-critical": 0,
      "Medical": 0,
      "Non-medical": 0,
    },
    nestedGroups: [
      {
        title: "General examination",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "General examination performed correctly",
            comment: "Information is complete",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
      {
        title: "System-specific examination",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "System-specific examination performed correctly",
            comment: "Information is complete",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
    ],
  },
  {
    title: "Main and comorbid diagnoses",
    typeCount: {
      "Critical": 2,
      "Non-critical": 0,
      "Medical": 0,
      "Non-medical": 0,
    },
    nestedGroups: [
      {
        title: "Main diagnosis",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Main diagnosis does not match clinical picture",
            comment: "Clarify diagnosis based on patient complaints",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
      {
        title: "Comorbid conditions",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Not all comorbid conditions are listed in diagnosis",
            comment: "It is recommended to add info about type 2 diabetes",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
    ],
  },
  {
    title: "Diagnostic procedures",
    typeCount: {
      "Critical": 2,
      "Non-critical": 0,
      "Medical": 0,
      "Non-medical": 0,
    },
    nestedGroups: [
      {
        title: "Lab tests",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Lab tests ordered correctly",
            comment: "All necessary tests were ordered",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
    ],
  },
  {
    title: "Treatment and preventive measures",
    typeCount: {
      "Critical": 2,
      "Non-critical": 0,
      "Medical": 0,
      "Non-medical": 0,
    },
    nestedGroups: [
      {
        title: "Pharmacological therapy",
        typeCount: {
          "Critical": 2,
          "Non-critical": 0,
          "Medical": 0,
          "Non-medical": 0,
        },
        issues: [
          {
            title: "Therapy prescribed correctly",
            comment: "Prescriptions match clinical guidelines",
            types: ["Critical"],
            tooltip: "If the patient came for a disease-related visit (acute or chronic)...",
            lastEditBy: "AI",
          },
        ],
      },
    ],
  },
]
