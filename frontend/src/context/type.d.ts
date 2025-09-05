import type React from "react"

export type AppError = {
    message: string,
    infos: string
}

export type ErrorContextType = {
    errors: AppError[];
    setErrors: React.Dispatch<React.SetStateAction<AppError[]>>;
};

export type LoadContextType = {
    isLoad: boolean;
    setLoad: (value: boolean) => void;
};

export type SearchContextType = {
  search: string;
  setSearch: (value: string) => void;
};