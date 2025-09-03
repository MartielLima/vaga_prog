import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { AppError, ErrorContextType } from "./type"

export const ErrorContext = createContext<ErrorContextType>({
  errors: [],
  setErrors: () => { },
});

export function ErrorProvider({ children }: { children: ReactNode }) {
  const [errors, setErrors] = useState<AppError[]>([]);

  return (
    <ErrorContext.Provider value={{ errors: errors, setErrors: setErrors }}>
      {children}
    </ErrorContext.Provider>
  );
}

export function useError() {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de SearchProvider");
  }
  return context;
}
