import { Button } from "./ui/button"

import { Filters } from "./filter-chip"

interface FilterMenuProps {
    filterKind: string
    filterType: keyof Filters
    openDropdown: string | null
    setOpenDropdown: (dropdown: string | null) => void
    tempFilters: Filters
    setTempFilters: (filters: Filters) => void
    filterOptions?: string[]
    toggleFilterOption: (filterType: keyof Filters, option: string) => void
    applyFilter: (filterType: string) => void
}

export default function FilterMenu({ 
  filterKind, 
  filterType, 
  openDropdown, 
  filterOptions, 
  tempFilters, 
  toggleFilterOption, 
  setTempFilters, 
  setOpenDropdown, 
  applyFilter 
}: FilterMenuProps) {
  return (
    <div>
      {openDropdown === filterType && (
        <div className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg border-1 border-gray-200">
          <div className="p-1 max-h-60 overflow-auto">
            <FilterBody
              filterType={filterType}
              filterKind={filterKind}
              filterOptions={filterOptions}
              tempFilters={tempFilters}
              toggleFilterOption={toggleFilterOption}
              setTempFilters={setTempFilters}
            />
          </div>
          <div className="flex justify-end gap-2 p-3 border-t">
            <Button className="cursor-pointer" variant="outline" size="sm" onClick={() => setOpenDropdown(null)}>
              Cancel
            </Button>
            <Button className="cursor-pointer" variant="default" size="sm" onClick={() => applyFilter(filterType)}>
              Apply
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

interface FilterBodyProps {
    filterKind: string
    filterType: keyof Filters
    filterOptions?: string[]
    tempFilters: Filters
    toggleFilterOption: (filterType: keyof Filters, option: string) => void
    setTempFilters: (filters: Filters) => void
}

function FilterBody({
    filterKind,
    filterType,
    filterOptions,
    tempFilters,
    toggleFilterOption,
}: FilterBodyProps) {
  // Render based on filter type
  switch (filterKind) {
    case "checkbox":
      return (
        <>
          {filterOptions && filterOptions.map((option: string) => (
            <div key={option} className="flex items-center text-sm px-4 py-2 hover:bg-gray-100 rounded-sm cursor-pointer">
              <input
                type="checkbox"
                id={`${filterType}-${option}`}
                checked={Array.isArray(tempFilters[filterType]) && (tempFilters[filterType] || []).includes(option)}
                onChange={() => toggleFilterOption(filterType, option)}
                className="mr-2 cursor-pointer"
              />
              <label className="cursor-pointer" htmlFor={`${filterType}-${option}`}>{option}</label>
            </div>
          ))}
        </>
      )

    case "substring":
      if (("value" in tempFilters[filterType])) {
      return (
        <div>
            <div className="mb-3">
                <select
                value={tempFilters.diagnosis.condition}
                // onChange={(e) =>
                //     setTempFilters((prevTempFilters) => ({
                //     ...prevTempFilters,
                //     diagnosis: {
                //         ...prevTempFilters.diagnosis, // Preserve the existing structure of `tempFilters.diagnosis`
                //         condition: e.target.value,
                //     },
                //     }))
                // }
                className="w-full p-2 border rounded-md text-sm"
                >
                <option value="contains">Contains</option>
                <option value="notContains">Not contains</option>
                </select>
            </div>
            <div>
            <input
                type="text"
                value={(tempFilters[filterType] as { value?: string })?.value || ""}
                // onChange={(e) =>
                // setTempFilters((prevTempFilters) => ({
                //     ...prevTempFilters,
                //     [filterType]: {
                //     ...prevTempFilters[filterType],
                //     value: e.target.value,
                //     },
                // }))
                // }
                placeholder="Enter text..."
                className="w-full p-2 border rounded-md text-sm"
            />
            </div>
        </div>
      )
    }

    case "dateRange":
      if (("from" in tempFilters[filterType]) && ("to" in tempFilters[filterType])) {
      return (
        <div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">From:</label>
            <input
              type="date"
              value={(tempFilters[filterType] as { from?: string })?.from || ""}
              // onChange={(e) =>
              //   setTempFilters((prevTempFilters) => ({
              //     ...prevTempFilters,
              //     [filterType]: {
              //       ...prevTempFilters[filterType],
              //       from: e.target.value,
              //     },
              //   }))
              // }
              className="w-full p-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">To:</label>
            <input
              type="date"
              value={(tempFilters[filterType] as { to?: string })?.to || ""}
              // onChange={(e) =>
              //   setTempFilters((prevTempFilters) => ({
              //     ...prevTempFilters,
              //     [filterType]: {
              //       ...prevTempFilters[filterType],
              //       to: e.target.value,
              //     },
              //   }))
              // }
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>
      )
    }

    default:
      return <div>Unknown filter type</div>
  }
}