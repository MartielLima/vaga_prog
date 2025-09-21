import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

import fetchData from "../../../Util/fetchData";
import { useError } from "../../../context/ErrorContext";
import { ButtonGen, CentralizedContainer, FooterContainer, MainContainer, Message, Table, Title } from "./styled";
import ConvertMonth from "../../../Util/ConvertMonthNumberToNameInString";

import type { Funcionario } from "../../Table/type";

const BirthdayPersonOfTheMonth = ({ children, month }: { children: string, month: string }) => {
    const [data, setData] = useState<Funcionario[]>()
    const { setErrors } = useError();

    useEffect(() => {
        const fetch = async () => {
            const _data = await fetchData(setErrors);
            if (!_data) return
            setData(_data)
        }

        fetch()
    }, [setErrors])

    const filteredData = data?.filter(funcionario => ConvertMonth(Number(funcionario.dataNascimento.split("/")[1])) === month)

    filteredData?.sort((a, b) => {
        const valueA: string | number = a["nome"];
        const valueB: string | number = b["nome"];
        if (typeof valueA === "string" && typeof valueB === "string") {
            return valueA.localeCompare(valueB);
        }
        return 0;
    });


    const reportRef = useRef<HTMLDivElement>(null);

    const generatePDF = () => {
        if (reportRef.current) {
            const options = {
                margin: 10,
                filename: "Aniversariantes do Mes.pdf",
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
                <Title>🎉 Parabéns aos aniversariantes do mês! 🎂</Title>
            </CentralizedContainer>
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
                            Função
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData?.map((person, index) => {
                        return (
                            <tr key={person.id}>
                                <td>{index + 1}</td>
                                <td>{person.nome}</td>
                                <td>{person.dataNascimento}</td>
                                <td>{person.funcao}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <Message>
                Desejamos a cada um de vocês muitas felicidades, saúde, conquistas e momentos especiais. Que este novo ciclo seja repleto de sucesso e realizações, tanto na vida pessoal quanto profissional.
                É uma alegria ter vocês em nossa equipe.
            </Message>
            <FooterContainer>
                Aproveitem muito o dia de vocês! 🎊✨
            </FooterContainer>
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

export default BirthdayPersonOfTheMonth;