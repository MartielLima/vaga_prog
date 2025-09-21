import type React from "react"

export type AppError = {
    [key: string]: string,
    [key: string]: string
}

export type ErrorContextType = {
    errors: AppError[];
    setErrors: React.Dispatch<React.SetStateAction<AppError[]>>;
};

export type LoadContextType = {
    isLoad: boolean;
    setLoad: (value: boolean) => void;
};

export type StopHighFetch = {
    isStopped: boolean,
  setIsStopped: (value: boolean) => void,
};

export type SearchContextType = {
    search: string;
    setSearch: (value: string) => void;
};

export type filters = {
    Salary: {
        minimum: number;
        maximum: number;
    };
    DateOfBirth: {
        minimum: Date | null;
        maximum: Date | null;
    };
    jobTitle: string;
}

export type FiltersContextType = {
    filtersValues: filters
    setFiltersValues: (content: filters) => void;
};