import type { ResponseToJSONPropsGetAll } from "../App";

//TODO concertar fatchData e adicionar erros ao tela

const fetchData = async () => {
    try {
        const response = await fetch('http://127.0.0.1:8085/all');

        const json: ResponseToJSONPropsGetAll = await response.json();

        // if (!response.ok) {
        //     const data: AppError = await response.json();
        //     setErrors(prev => [...prev, data]);

        // } else {
        //     const json: ResponseToJSONPropsGetAll = await response.json();
        //     setItensTabela(json.funcionario);
        // }

        return json.funcionario

    } catch (err) {
        // if (err instanceof Error) {
        //     const data: AppError = { message: "Erro ao deletar usuário:", infos: err.message }
        //     setErrors(prev => [...prev, data]);
        // }
        return null;
    }
};

export default async function GetAndCalculateSalary() {
    const promise = fetchData();
    const employees = await promise;

    if (!employees) return;

    let totSalary: number = 0;

    for (let e of employees) {
        totSalary += e.salario
    }

    return totSalary
}