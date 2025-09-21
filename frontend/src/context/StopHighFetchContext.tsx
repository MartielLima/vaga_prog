/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { StopHighFetch } from "./type"

export const StopHighFetchContext = createContext<StopHighFetch>({
  isStopped: false,
  setIsStopped: () => { },
});

export function LoadProvider({ children }: { children: ReactNode }) {
  const [isStopped, setIsStopped] = useState(false);

  return (
    <StopHighFetchContext.Provider value={{ isStopped: isStopped, setIsStopped: setIsStopped }}>
      {children}
    </StopHighFetchContext.Provider>
  );
}


export function useIsStopped() {
  const context = useContext(StopHighFetchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de SearchProvider");
  }
  return context;
}
