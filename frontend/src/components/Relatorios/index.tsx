
import { FaRegListAlt } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { HiOutlineCake } from "react-icons/hi2";
import { MdOutlinePayments } from "react-icons/md";

import { Container, Content, CardContainer } from './styled';
import { useEffect, useState } from "react";
import GetAndCalculateSalary from "../../Util/getAndCalculateSalary";
import formatCurrency from "../../Util/formatCurrency";

import ConvertMonth from "../../Util/ConvertMonthNumberToNameInString";
import type { month as monthType } from "../../Util/ConvertMonthNumberToNameInString";
import BirthdayPersonOfTheMonth from "./BirthdayPersonOfTheMonth";
import AllEmployees from "./AllEmployees";
import EmployeesGroupedByFunction from "./EmployeesGroupedByFunction";
import SalaryQuotedByMinimumWage from "./SalaryQuotedByMinimumWage";


type Props = {
    open: boolean;
    toggleOpen: () => void;
}

export default function Relatorio({ open, toggleOpen }: Props) {
    const [hoverListCollaborators, setHoverInListCollaborators] = useState(false)
    const [hoverInEmployeesGroupedByPosition, setHoverInEmployeesGroupedByPosition] = useState(false)
    const [hoverInBirthdaysOfTheMonth, setHoverInBirthdaysOfTheMonth] = useState(false)
    const [hoverInSalary, setHoverInSalary] = useState(false)
    const [totalSalary, setTotalSalary] = useState("")
    const [monthOfInterest, setMonthOfInterest] = useState<monthType>(ConvertMonth())
    const [salaryQuotedByMinimumWage, setSalaryQuotedByMinimumWage] = useState(false)
    const [minimumWageValue, setMinimumWageValue] = useState(1518)

    const months = [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
    ];


    useEffect(() => {
        const fetchSalary = async () => {
            const totSalary = await GetAndCalculateSalary();
            if (!totSalary) return;
            setTotalSalary(formatCurrency(totSalary));
        }

        fetchSalary()
    }, [])

    const handleSetMonth = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMonthOfInterest(e.target.value as monthType)
    }

    const handleChangeMinimumWageValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value;
        input = input.replace(/\D/g, '');
        const numberValue = Number(input) / 100;
        setMinimumWageValue(numberValue);
    };

    return (
        <Container open={open} onClick={toggleOpen} >
            <Content open={open} onClick={(e) => e.stopPropagation()}>
                <h1>Relatorios</h1>
                <div className="subContainer">
                    <CardContainer onMouseEnter={() => setHoverInListCollaborators(true)} onMouseLeave={() => setHoverInListCollaborators(false)}>
                        <FaRegListAlt />
                        <p>
                            Gerar uma lista de todos os colaboradores contendo seus dados.
                        </p>
                        {hoverListCollaborators && (
                            <AllEmployees>
                                Gerar Relatorio
                            </AllEmployees>
                        )}
                    </CardContainer>
                    <CardContainer onMouseEnter={() => setHoverInEmployeesGroupedByPosition(true)} onMouseLeave={() => setHoverInEmployeesGroupedByPosition(false)} >
                        <TbReportSearch />
                        <p>
                            Gerar uma lista de todos os colaboradores agrupados por cargo.
                        </p>
                        {hoverInEmployeesGroupedByPosition && (
                            <EmployeesGroupedByFunction>
                                Gerar Relatorio
                            </EmployeesGroupedByFunction>
                        )}
                    </CardContainer>
                    <CardContainer onMouseEnter={() => setHoverInBirthdaysOfTheMonth(true)} onMouseLeave={() => setHoverInBirthdaysOfTheMonth(false)} >
                        <HiOutlineCake />
                        <p>
                            Gerar uma lista contendo todos os colaboradores que fazem aniversario no mes selecionado.
                        </p>
                        {hoverInBirthdaysOfTheMonth && (
                            <>
                                <label htmlFor="mes">Escolha um mês:</label>
                                <select id="mes" name="mes" value={monthOfInterest} onChange={e => handleSetMonth(e)}>
                                    {months.map((month) => {
                                        return (
                                            <option value={month}>{month}</option>
                                        )
                                    })}
                                </select>
                                <BirthdayPersonOfTheMonth month={monthOfInterest}>
                                    Gerar Relatorio
                                </BirthdayPersonOfTheMonth>
                            </>
                        )}
                    </CardContainer>
                    <CardContainer onMouseEnter={() => setHoverInSalary(true)} onMouseLeave={() => { setHoverInSalary(false); setSalaryQuotedByMinimumWage(false) }} >
                        <MdOutlinePayments />
                        {!hoverInSalary && (
                            <p>
                                Ver o investimento mensal em salario, para os colaboradores.
                            </p>
                        )}
                        {hoverInSalary && !salaryQuotedByMinimumWage && (
                            <>
                                <p>Valor Total investido em salario</p>
                                <input type="text" value={totalSalary} readOnly />
                                <button onClick={() => setSalaryQuotedByMinimumWage(true)}>Relatorio Salario Minimo</button>
                            </>
                        )}
                        {salaryQuotedByMinimumWage && (
                            <>
                                <p>Ver quantos salários minimo os colaboradores recebe</p>
                                <input type="text" value={formatCurrency(minimumWageValue)} onChange={handleChangeMinimumWageValue} placeholder="R$ 0,00" />
                                <SalaryQuotedByMinimumWage minimumWage={minimumWageValue}>
                                    Gerar Relatorio
                                </SalaryQuotedByMinimumWage>
                            </>
                        )}
                    </CardContainer>
                </div>
            </Content>
        </Container>
    );
};

// TODO verificar uma forma de fazer
/* 
    Funcionário mais velho:
    - Nome: Heloisa
    - Data de Nascimento: 2003-05-24
*/


