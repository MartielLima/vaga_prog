/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { LoadContextType } from "./type"

export const LoadContext = createContext<LoadContextType>({
  isLoad: false,
  setLoad: () => { },
});

export function LoadProvider({ children }: { children: ReactNode }) {
  const [isLoad, setLoad] = useState(false);

  return (
    <LoadContext.Provider value={{ isLoad: isLoad, setLoad: setLoad }}>
      {children}
    </LoadContext.Provider>
  );
}


export function useIsLoad() {
  const context = useContext(LoadContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de SearchProvider");
  }
  return context;
}
