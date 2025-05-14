import { Button } from "@/components/ui/button"
import { ChevronDown, X } from "lucide-react"
import StrokedIcon from "./icon-with-borders"

export const filterNameMap = {
  "specialty": "Specialty",
  "diagnosis": "Diagnosis",
  "quality": "Audit result",
  "defects": "Number of defects",
  "receptionDate": "Appointment date",
  "clinicId": "Clinic",
  "lastModified": "Last modified date",
};


export interface Filters {
  specialty: string[]
  diagnosis: { condition: "contains" | "notContains"; value: string }
  quality: string[]
  defects: string[]
  receptionDate: { from: string; to: string }
  clinicId: string[]
  lastModified: { from: string; to: string }
}

interface FilterChipProps {
  filterType: keyof typeof filterNameMap
  filters: Filters
  openDropdown: string | null
  toggleDropdown: (id: string) => void
  removeFilter: (id: string) => void
  availableFilters: { id: string; alwaysVisible?: boolean }[]
}

function formatFilterValues(filterValues: string[] | { from: string; to: string } | { condition: "contains" | "notContains"; value: string }): string {
  if (Array.isArray(filterValues)) {
    if (filterValues.length > 1)
      return filterValues[0] + " +" + (filterValues.length - 1);
    else
      return filterValues.join(", ");
  } else if ("from" in filterValues && "to" in filterValues) {
    return `${filterValues.from || "N/A"} - ${filterValues.to || "N/A"}`;
  } else if ("condition" in filterValues && "value" in filterValues) {
    return `${filterValues.condition}: ${filterValues.value}`;
  }
  return "";
}

export default function FilterChip({ filterType, filters, toggleDropdown, removeFilter, availableFilters }: FilterChipProps) {
  const filterValues = filters[filterType]

  let filterLength = false

  if (Array.isArray(filterValues)) {
    filterLength = filterValues.length > 0;
  } else if (filterType === "diagnosis" && "value" in filterValues && filterValues.value) {
    filterLength = filterValues.value.length > 0;
  } else if (["receptionDate", "lastModified"].includes(filterType) && ("from" in filterValues && "to" in filterValues)) {
    filterLength = (typeof filterValues.from === "string" && filterValues.from.length > 0) || (typeof filterValues.to === "string" && filterValues.to.length > 0);
  } else {
    filterLength = false;
  }

  return (
      <div className={`flex items-center gap-1 border rounded-full group/chip cursor-pointer
          ${filterLength ? "bg-blue-600 hover:bg-blue-700 text-white border-none" : "bg-white hover:bg-gray-100"}
        `}>
          <Button
              variant="ghost"
              className={`flex items-center gap-2 rounded-full transition-none shadow-none cursor-pointer
                ${filterLength ? "bg-blue-600 group-hover/chip:bg-blue-700 hover:bg-blue-700 group-hover/chip:text-white hover:text-white" : "bg-white group-hover/chip:bg-gray-100"}`}
              onClick={() => toggleDropdown(filterType)}
          >
            <div>
              <span>{filterNameMap[filterType]}</span>
              <span className="font-normal">{filterLength ? `: ${formatFilterValues(filterValues)}` : ""}</span>
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
                  ${filterLength ? " bg-blue-600 group-hover/chip:bg-blue-700 hover:bg-blue-700" : "bg-white group-hover/chip:bg-gray-100"}
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