import type { ResponseToJSONPropsGetAll } from "../App";
import type { AppError } from "../context/type";

export default async function fetchData(setErrors?: React.Dispatch<React.SetStateAction<AppError[]>>) {
    try {
        const response = await fetch('http://127.0.0.1:8085/all');
        if (!response.ok) {
            const data: AppError = await response.json();

            if (setErrors) setErrors(prev => [...prev, data]);

        } else {
            const json: ResponseToJSONPropsGetAll = await response.json();
            return json.funcionario
        }
    } catch (err) {
        if (err instanceof Error) {
            const data: AppError = { message: "Erro ao deletar usuário:", infos: err.message }
            if (setErrors) setErrors(prev => [...prev, data]);
        }
        return null;
    }
};