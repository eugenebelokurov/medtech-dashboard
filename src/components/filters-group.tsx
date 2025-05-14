import { Button } from "./ui/button";

import Filter from "./filter";
import FilterChip from "./filter-chip";
import FilterMenu from "./filter-menu";

// Specialty options
const specialtyOptions = ["Gynecologist", "Therapist", "Cardiologist", "Neurologist", "Ophthalmologist"];

// Quality options
const qualityOptions = ["Good quality", "Average quality", "Poor quality"];

// Defect types
const defectTypes = ["Critical", "Medium", "Minor"];


// Clinic IDs
const clinicIds = ["KL-1001", "KL-1002", "KL-1003", "KL-1004", "KL-1005"]

interface FilterGroupProps {
    openDropdown: string | null;
    activeFilters: string[];
    dropdownRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    setOpenDropdown: (id: string | null) => void;
    tempFilters: { [key: string]: any };
    toggleFilterOption: (filterType: string, option: string) => void;
    filterOptions?: any;
    setTempFilters: (filters: { [key: string]: any }) => void;
    applyFilter: (filterType: string) => void;
    filters: { [key: string]: any };
    toggleDropdown: (id: string) => void;
    removeFilter: (id: string) => void;
    availableFilters: { id: string; alwaysVisible?: boolean }[];
}

export default function FiltersGroup({
    activeFilters,
    dropdownRefs,
    filters,
    toggleDropdown,
    removeFilter,
    availableFilters,
    openDropdown,
    setOpenDropdown,
    tempFilters,
    toggleFilterOption,
    setTempFilters,
    applyFilter,
}: FilterGroupProps) {
    return (
        <>
            {/* Specialty Filter */}
            <Filter
                filterType="specialty"
                filterKind="checkbox"
                activeFilters={activeFilters}
                dropdownRefs={dropdownRefs}
                filters={filters}
                toggleDropdown={toggleDropdown}
                removeFilter={removeFilter}
                availableFilters={availableFilters}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                tempFilters={tempFilters}
                toggleFilterOption={toggleFilterOption}
                filterOptions={specialtyOptions}
                setTempFilters={setTempFilters}
                applyFilter={applyFilter}
            />

            {/* Diagnosis Filter */}
            <Filter
                filterType="diagnosis"
                filterKind="substring"
                activeFilters={activeFilters}
                dropdownRefs={dropdownRefs}
                filters={filters}
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

            {/* Quality Filter */}
            <Filter
                filterType="quality"
                filterKind="checkbox"
                activeFilters={activeFilters}
                dropdownRefs={dropdownRefs}
                filters={filters}
                toggleDropdown={toggleDropdown}
                removeFilter={removeFilter}
                availableFilters={availableFilters}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                tempFilters={tempFilters}
                toggleFilterOption={toggleFilterOption}
                filterOptions={qualityOptions}
                setTempFilters={setTempFilters}
                applyFilter={applyFilter}
            />

            {/* Defects Filter */}
            <Filter
                filterType="defects"
                filterKind="checkbox"
                activeFilters={activeFilters}
                dropdownRefs={dropdownRefs}
                filters={filters}
                toggleDropdown={toggleDropdown}
                removeFilter={removeFilter}
                availableFilters={availableFilters}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                tempFilters={tempFilters}
                toggleFilterOption={toggleFilterOption}
                filterOptions={defectTypes}
                setTempFilters={setTempFilters}
                applyFilter={applyFilter}
            />

      {/* Reception Date Filter */}
      {activeFilters.includes("receptionDate") && (
        <div className="relative" ref={(el) => (dropdownRefs.current["receptionDate"] = el)}>
          <FilterChip
            filterType="receptionDate"
            openDropdown={openDropdown}
            filters={filters}
            toggleDropdown={toggleDropdown}
            removeFilter={removeFilter}
            availableFilters={availableFilters}
          />

          {openDropdown === "receptionDate" && (
            <div className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg">
              <div className="p-3">
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">From:</label>
                  <input
                    type="date"
                    value={tempFilters.receptionDate.from}
                    onChange={(e) =>
                      setTempFilters((prevTempFilters) => ({
                        ...prevTempFilters,
                        receptionDate: {
                          ...prevTempFilters.receptionDate,
                          from: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To:</label>
                  <input
                    type="date"
                    value={tempFilters.receptionDate.to}
                    onChange={(e) =>
                      setTempFilters((prevTempFilters) => ({
                        ...prevTempFilters,
                        receptionDate: {
                          ...prevTempFilters.receptionDate,
                          to: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 p-3 border-t">
                <Button variant="outline" size="sm" onClick={() => setOpenDropdown(null)}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={() => applyFilter("receptionDate")}>
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Clinic ID Filter */}
      {activeFilters.includes("clinicId") && (
        <div className="relative" ref={(el) => (dropdownRefs.current["clinicId"] = el)}>
          <FilterChip
            filterType="clinicId"
            openDropdown={openDropdown}
            filters={filters}
            toggleDropdown={toggleDropdown}
            removeFilter={removeFilter}
            availableFilters={availableFilters}
          />

          <FilterMenu
            filterType="clinicId"
            filterKind="checkbox"
            openDropdown={openDropdown}
            setOpenDropdown={setOpenDropdown}
            tempFilters={tempFilters}
            toggleFilterOption={toggleFilterOption}
            filterOptions={clinicIds}
            setTempFilters={setTempFilters}
            applyFilter={applyFilter}
          />
        </div>
      )}

      {/* Last Modified Filter */}
      {activeFilters.includes("lastModified") && (
        <div className="relative" ref={(el) => (dropdownRefs.current["lastModified"] = el)}>
          <FilterChip
            filterType="lastModified"
            openDropdown={openDropdown}
            filters={filters}
            toggleDropdown={toggleDropdown}
            removeFilter={removeFilter}
            availableFilters={availableFilters}
          />

          {openDropdown === "lastModified" && (
            <div className="absolute z-10 mt-2 w-64 rounded-md bg-white shadow-lg">
              <div className="p-3">
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">From:</label>
                  <input
                    type="date"
                    value={tempFilters.lastModified.from}
                    onChange={(e) =>
                      setTempFilters((prevTempFilters) => ({
                        ...prevTempFilters,
                        lastModified: {
                          ...prevTempFilters.lastModified,
                          from: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">To:</label>
                  <input
                    type="date"
                    value={tempFilters.lastModified.to}
                    onChange={(e) =>
                      setTempFilters((prevTempFilters) => ({
                        ...prevTempFilters,
                        lastModified: {
                          ...prevTempFilters.lastModified,
                          to: e.target.value,
                        },
                      }))
                    }
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 p-3 border-t">
                <Button variant="outline" size="sm" onClick={() => setOpenDropdown(null)}>
                  Cancel
                </Button>
                <Button variant="default" size="sm" onClick={() => applyFilter("lastModified")}>
                  Apply
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      
    </>
    );
}