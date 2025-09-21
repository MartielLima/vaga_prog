import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

import fetchData from "../../../Util/fetchData";
import { useError } from "../../../context/ErrorContext";
import { ButtonGen, CentralizedContainer, ListContainer, MainContainer, Table, Title } from "./styled";

import type { Funcionario } from "../../Table/type";

const EmployeesGroupedByFunction = ({ children }: { children: string }) => {
    const [data, setData] = useState<Funcionario[]>([])
    const { setErrors } = useError();

    useEffect(() => {
        const fetch = async () => {
            const _data = await fetchData(setErrors);
            if (!_data) return
            setData(_data)
        }

        fetch()
    }, [setErrors])

    const groupingByFunction = data.reduce((map, func) => {
        if (!map[func.funcao]) {
            map[func.funcao] = [];
        }
        map[func.funcao].push(func);
        return map;
    }, {} as Record<string, Funcionario[]>);

    const orderedGroups = Object.entries(groupingByFunction).map(
        ([position, group]) => ({
            position,
            employees: group.sort((a, b) => a.nome.localeCompare(b.nome)),
        })
    );



    const reportRef = useRef<HTMLDivElement>(null);

    const generatePDF = () => {
        if (reportRef.current) {
            const options = {
                margin: 10,
                filename: "Funcionarios Agrupados por Cargo.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
            };

            html2pdf().set(options).from(reportRef.current).save();
        }
    };

    const pdfContent = (
        <MainContainer ref={reportRef}>

            <CentralizedContainer>
                <img src="../../../../projedata.png" alt="Logo" style={{ width: "150px" }} />
            </CentralizedContainer>
            <CentralizedContainer>
                <Title>Funcionarios Agrupados por Cargo</Title>
            </CentralizedContainer>
            {
                orderedGroups.map(group => {
                    return (
                        <ListContainer>
                            <Title>{group.position}</Title>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>
                                            Nome
                                        </th>
                                        <th>
                                            Data de Nascimento
                                        </th>
                                        <th >
                                            Salário
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {group.employees.map((person, index) => {
                                        return (
                                            <tr key={person.id}>
                                                <td>{index + 1}</td>
                                                <td>{person.nome}</td>
                                                <td>{person.dataNascimento}</td>
                                                <td>{person.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </ListContainer>
                    )
                })
            }
        </MainContainer>
    )

    return (
        <>
            <ButtonGen onClick={generatePDF} >
                {children}
            </ButtonGen>
            <div style={{ display: "none" }}>{pdfContent}</div>
        </>
    );
}

export default EmployeesGroupedByFunction;