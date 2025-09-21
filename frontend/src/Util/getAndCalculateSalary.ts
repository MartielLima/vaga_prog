import fetchData from "./fetchData";

export default async function GetAndCalculateSalary() {
    const promise = fetchData();
    const employees = await promise;

    if (!employees) return;

    let totSalary: number = 0;

    for (const e of employees) {
        totSalary += e.salario
    }

    return totSalary
}