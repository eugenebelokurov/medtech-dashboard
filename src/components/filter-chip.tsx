import { Button } from "@/components/ui/button"
import { ChevronDown, X } from "lucide-react"
import StrokedIcon from "./icon-with-borders"

export const filterNameMap = {
  "specialty": "Specialty",
  "diagnosis": "Diagnosis",
  "quality": "Audit result",
  "defects": "Number of defects",
  "receptionDate": "Appointment date",
  // "isFirstVisit": "First visit",
  "clinicId": "Clinic",
  "lastModified": "Last modified date",
  // "verifiedBy": "Verified by",
};


interface Filters {
  specialty: string[]
  diagnosis: { condition: "contains" | "notContains"; value: string }
  quality: string[]
  defects: string[]
  receptionDate: { from: string; to: string }
  clinicId: string[]
  lastModified: { from: string; to: string }
  // isFirstVisit: boolean
  // verifiedBy: string
}

interface FilterChipProps {
  filterType: keyof typeof filterNameMap
  filters: Filters
  openDropdown: string | null
  toggleDropdown: (id: string) => void
  removeFilter: (id: string) => void
  availableFilters: { id: string; alwaysVisible?: boolean }[]
}

export default function FilterChip({ filterType, filters, toggleDropdown, removeFilter, availableFilters }: FilterChipProps) {
  const filterValues = filters[filterType]

  return (
      <div className={`flex items-center gap-1 border rounded-full group/chip cursor-pointer
          ${filterValues.length > 0 ? "bg-blue-600 hover:bg-blue-700 text-white border-none" : "bg-white hover:bg-gray-100"}
        `}>
          <Button
              variant="ghost"
              className={`flex items-center gap-2 rounded-full transition-none shadow-none cursor-pointer
                ${filterValues.length > 0 ? "bg-blue-600 group-hover/chip:bg-blue-700 hover:bg-blue-700 group-hover/chip:text-white hover:text-white" : "bg-white group-hover/chip:bg-gray-100"}`}
              onClick={() => toggleDropdown(filterType)}
          >
            <div>
              <span>{filterNameMap[filterType]}</span>
              <span className="font-normal">{filterValues.length > 0 ? `: ${filterValues.join(", ")}` : ""}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>

          {!availableFilters.find((f) => f.id === filterType)?.alwaysVisible && (
            <div className="flex items-center">
              <div className="h-4 w-[1px] bg-black opacity-30"></div>
              <Button
                variant="ghost"
                size="icon"
                className={`h-8 w-8 rounded-full group/icon transition-none cursor-pointer
                  ${filterValues.length > 0 ? " bg-blue-600 group-hover/chip:bg-blue-700 hover:bg-blue-700" : "bg-white group-hover/chip:bg-gray-100"}
                  `}
                onClick={() => removeFilter(filterType)}
              >
                <StrokedIcon icon={X} />
              </Button>
            </div>
          )}
      </div>
  )
}