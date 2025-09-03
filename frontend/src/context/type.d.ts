import type React from "react"

export type AppError = {
    message: string,
    infos: string
}

export type ErrorContextType = {
    errors: AppError[];
    setErrors: React.Dispatch<React.SetStateAction<AppError[]>>;
};