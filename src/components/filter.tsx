import FilterMenu from "./filter-menu";
import FilterChip, { filterNameMap } from "./filter-chip";

interface FilterProps {
    filterType: keyof typeof filterNameMap;
    filterKind: string;
    activeFilters: string[];
    dropdownRefs: React.MutableRefObject<{ [key: string]: HTMLDivElement | null }>;
    filters: { [key: string]: any };
    toggleDropdown: (id: string) => void;
    removeFilter: (id: string) => void;
    availableFilters: { id: string; alwaysVisible?: boolean }[];
    openDropdown: string | null;
    setOpenDropdown: (id: string | null) => void;
    tempFilters: { [key: string]: any };
    toggleFilterOption: (filterType: string, option: string) => void;
    filterOptions?: any;
    setTempFilters: (filters: { [key: string]: any }) => void;
    applyFilter: (filterType: string) => void;
}

export default function Filter({
    filterType,
    filterKind,
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
    filterOptions,
    setTempFilters,
    applyFilter,
}: FilterProps) {
  return (
    <>
    {activeFilters.includes(filterType) && (
        <div className="relative" ref={(el) => (dropdownRefs.current[filterType] = el)}>
            <FilterChip
                filterType={filterType}
                filters={filters}
                openDropdown={openDropdown}
                toggleDropdown={toggleDropdown}
                removeFilter={removeFilter}
                availableFilters={availableFilters}
            />
            <FilterMenu
                filterType={filterType}
                filterKind={filterKind}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                tempFilters={tempFilters}
                toggleFilterOption={toggleFilterOption}
                filterOptions={filterOptions}
                setTempFilters={setTempFilters}
                applyFilter={applyFilter}
            />
        </div>
    )}
    </>
  );
}