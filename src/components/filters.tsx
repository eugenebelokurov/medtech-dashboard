"use client"

import { useState, useRef, useEffect } from "react"
import { X, Plus, ArrowDownUp } from "lucide-react"
import { Button } from "@/components/ui/button"

import FiltersGroup from "./filters-group"

// Available filter columns
const availableFilters = [
  { id: "specialty", label: "Specialty", alwaysVisible: true },
  { id: "diagnosis", label: "Diagnosis", alwaysVisible: true },
  { id: "quality", label: "Audit result", alwaysVisible: true },
  { id: "defects", label: "Number of defects", alwaysVisible: false },
  { id: "receptionDate", label: "Appointment date", alwaysVisible: false },
  { id: "clinicId", label: "Clinic ID", alwaysVisible: false },
  { id: "lastModified", label: "Last modified", alwaysVisible: false },
];

interface FiltersProps {
  onFiltersChange: (filters: {
    specialty: string[]
    diagnosis: { condition: "contains" | "notContains"; value: string }
    quality: string[]
    defects: string[]
    receptionDate: { from: string; to: string }
    clinicId: string[]
    lastModified: { from: string; to: string }
  }) => void
}



export default function Filters({ onFiltersChange }: FiltersProps) {
  const [filters, setFilters] = useState<{ [key: string]: any }>({
    specialty: [],
    diagnosis: { condition: "contains", value: "" },
    quality: [],
    defects: [],
    receptionDate: { from: "", to: "" },
    clinicId: [],
    lastModified: { from: "", to: "" },
  })

  const [tempFilters, setTempFilters] = useState<{ [key: string]: any }>({
    specialty: [],
    diagnosis: { condition: "contains", value: "" },
    quality: [],
    defects: [],
    receptionDate: { from: "", to: "" },
    clinicId: [],
    lastModified: { from: "", to: "" },
  })

  // State for open dropdowns
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)

  const areFiltersApplied = () => {
  return (
    filters.specialty.length > 0 ||
    filters.diagnosis.value !== "" ||
    filters.quality.length > 0 ||
    filters.defects.length > 0 ||
    filters.receptionDate.from !== "" ||
    filters.receptionDate.to !== "" ||
    filters.clinicId.length > 0 ||
    filters.lastModified.from !== "" ||
    filters.lastModified.to !== ""
    )
  }

  console.log("Filters applied? ", filters.specialty.length, " " ,filters.diagnosis.value, " ", filters.quality.length)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        openDropdown &&
        dropdownRefs.current[openDropdown] &&
        !dropdownRefs.current[openDropdown]?.contains(event.target as Node)
      ) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [openDropdown])


  const toggleDropdown = (id: string) => {
    if (openDropdown === id) {
      setOpenDropdown(null)
    } else {
      setOpenDropdown(id)
      setTempFilters((prevTempFilters) => ({
        ...prevTempFilters,
        [id]: filters[id],
      }))
    }
  }
  
  const applyFilter = (filterType: string) => {
    console.log("Applying filter:", filterType, tempFilters[filterType])

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: tempFilters[filterType],
    }))
    setOpenDropdown(null)
  }

  // State for active filters
  const [activeFilters, setActiveFilters] = useState<string[]>(
    availableFilters.filter((f) => f.alwaysVisible).map((f) => f.id),
  )

  // Add filter
  const addFilter = (id: string) => {
    if (!activeFilters.includes(id)) {
      setActiveFilters([...activeFilters, id])
    }
    setOpenDropdown(null)
  }

  // Remove filter
  const removeFilter = (id: string) => {
    if (!availableFilters.find((f) => f.id === id)?.alwaysVisible) {
      setActiveFilters(activeFilters.filter((f) => f !== id))
    }
  }

  // Refs for dropdowns
  const dropdownRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  // Notify parent component when filters change - with proper dependencies
  useEffect(() => {
    // Create a single object with all filter values
    const filtersEffect = {
      specialty: filters.specialty,
      diagnosis: filters.diagnosis,
      quality: filters.quality,
      defects: filters.defects,
      receptionDate: filters.receptionDate,
      clinicId: filters.clinicId,
      lastModified: filters.lastModified,
    }

    // Call the parent's filter function
    onFiltersChange(filtersEffect)
  }, [
    filters.specialty,
    filters.diagnosis,
    filters.quality,
    filters.defects,
    filters.receptionDate,
    filters.clinicId,
    filters.lastModified,
    onFiltersChange,
  ])

  // Reset all filters
  const resetFilters = () => {
    setActiveFilters(availableFilters.filter((f) => f.alwaysVisible).map((f) => f.id))
    setFilters({
      specialty: [],
      diagnosis: { condition: "contains", value: "" },
      quality: [],
      defects: [],
      receptionDate: { from: "", to: "" },
      clinicId: [],
      lastModified: { from: "", to: "" },
    })
    setOpenDropdown(null)
  }

  const toggleFilterOption = (filterType: string, option: string) => {
    setTempFilters((prevTempFilters) => {
      const updatedFilter = (prevTempFilters[filterType] || []).includes(option)
        ? prevTempFilters[filterType].filter((o: string) => o !== option)
        : [...prevTempFilters[filterType], option]
  
      return { ...prevTempFilters, [filterType]: updatedFilter }
    })
  }


  return (
    <div className="flex flex-row items-start gap-3 mb-6 bg-[#FAFAFA] p-2 rounded-lg">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 pr-3 border-r">
          <Button 
            className="text-sm"
            variant="ghost"
          >
            <ArrowDownUp className="h-4 w-4" />
            Sort
          </Button>
        </div>

        <FiltersGroup
          filters={filters}
          activeFilters={activeFilters}
          dropdownRefs={dropdownRefs}
          toggleDropdown={toggleDropdown}
          removeFilter={removeFilter}
          availableFilters={availableFilters}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
          tempFilters={tempFilters}
          toggleFilterOption={toggleFilterOption}
          setTempFilters={setTempFilters}
          applyFilter={applyFilter}
        />

        {/* Add Filter Button */}
        <div className="relative" ref={(el) => (dropdownRefs.current["addFilter"] = el)}>
          <Button
            variant="ghost"
            className={`flex items-center gap-2 rounded-full cursor-pointer
              ${ openDropdown === "addFilter" ? "bg-gray-100" : ""}
              `}
            onClick={() => toggleDropdown("addFilter")}
          >
            <Plus className="h-4 w-4" />
            Add filter
          </Button>

          {openDropdown === "addFilter" && (
            <div className="absolute z-10 mt-1 w-56 rounded-md bg-white shadow-lg p-1 text-sm border-1 border-gray-200">
              <div className="">
                {availableFilters
                  .filter((filter) => !filter.alwaysVisible && !activeFilters.includes(filter.id))
                  .map((filter) => (
                    <button
                      key={filter.id}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-sm cursor-pointer"
                      onClick={() => addFilter(filter.id)}
                    >
                      {filter.label}
                    </button>
                  ))}
                {availableFilters.filter((filter) => !filter.alwaysVisible && !activeFilters.includes(filter.id))
                  .length === 0 && <div className="px-4 py-2 text-gray-500 text-sm">All filters are added</div>}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Reset Filters Button */}
      { areFiltersApplied() &&
      <div className="ml-auto">
        <Button variant="ghost" className="flex items-center gap-2 cursor-pointer" onClick={resetFilters}>
          <X className="h-4 w-4" />
          Reset filters
        </Button>
      </div>
    }
    </div>
  )
}
