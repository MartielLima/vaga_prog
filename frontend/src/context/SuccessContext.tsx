import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { SuccessContextType } from "./type"

export const SuccessContext = createContext<SuccessContextType>({
  success: false,
  setSuccess: () => { },
});

export function SuccessProvider({ children }: { children: ReactNode }) {
  const [success, setSuccess] = useState(false);

  return (
    <SuccessContext.Provider value={{ success, setSuccess }}>
      {children}
    </SuccessContext.Provider>
  );
}

export function useSuccess() {
  const context = useContext(SuccessContext);
  if (!context) {
    throw new Error("success deve ser usado dentro de SearchProvider");
  }
  return context;
}
