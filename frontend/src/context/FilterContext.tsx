import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { FiltersContextType, filters } from "./type";

const FilterContext = createContext<FiltersContextType>({
  filtersValues: {
    Salary: {
      minimum: 0,
      maximum: 0
    },
    DateOfBirth: {
      minimum: null,
      maximum: null
    },
    jobTitle: ""
  },
  setFiltersValues: () => { }
});

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filtersValues, setFiltersValues] = useState<filters>({
    Salary: {
      minimum: 0,
      maximum: 0,
    },
    DateOfBirth: {
      minimum: null,
      maximum: null,
    },
    jobTitle: ""
  });

  return (
    <FilterContext.Provider value={{ filtersValues, setFiltersValues }}>
      {children}
    </FilterContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFiltersValues() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFiltersValues deve ser usado dentro de FilterProvider");
  }
  return context;
}
