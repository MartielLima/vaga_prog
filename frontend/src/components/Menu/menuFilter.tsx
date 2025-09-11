import { Container, Sidebar, FilterTitle, InputItem, FilterContainer, ButtonClean } from "./styled"
import { useState, useEffect } from "react";
import { MdFilterAltOff } from "react-icons/md";
import { useFiltersValues } from "../../context/FilterContext";
import OutsideClick from "../../hooks/OutsideClick";
// TODO, Filtros lançados no estado global, agora basta verificar o erro do componente no log, tirar o setter do stado de um useEffect e adicionar em uma função com o submit.

type filterSalary = {
    minimum: number,
    maximum: number
}

type filterInputSalary = {
    minimum: string,
    maximum: string
}

type filterDateOfBirth = {
    minimum: Date | null,
    maximum: Date | null
}

export default function RightMenuFilter({ open, toggleFilter }: { open: boolean, toggleFilter: () => void }) {
    const { setFiltersValues } = useFiltersValues();
    const ref = OutsideClick(toggleFilter);

    const [salaryValues, setSalaryValues] = useState<filterSalary>({
        minimum: 0,
        maximum: 0
    })
    const [salaryInputValues, setSalaryInputValues] = useState<filterInputSalary>({
        minimum: "R$ 0,00",
        maximum: "R$ 0,00"
    })
    const handleChangeSalary = {
        minimum: (e: React.ChangeEvent<HTMLInputElement>) => {
            let input = e.target.value;
            input = input.replace(/\D/g, '');

            const numberValue = Number(input) / 100;

            const formattedValue = numberValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });

            setSalaryValues({
                ...salaryValues,
                minimum: numberValue
            });

            setSalaryInputValues({
                ...salaryInputValues,
                minimum: formattedValue
            });
        },
        maximum: (e: React.ChangeEvent<HTMLInputElement>) => {
            let input = e.target.value;
            input = input.replace(/\D/g, '');

            const numberValue = Number(input) / 100;

            const formattedValue = numberValue.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
            });

            setSalaryValues({
                ...salaryValues,
                maximum: numberValue
            });

            setSalaryInputValues({
                ...salaryInputValues,
                maximum: formattedValue
            });
        },
    }

    const [dateOfBirthValues, setDateOfBirthValues] = useState<filterDateOfBirth>({
        minimum: null,
        maximum: null
    })
    const handleChangeDateOfBirth = {
        minimum: (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            const dateValue = new Date(input);

            setDateOfBirthValues({
                ...dateOfBirthValues,
                minimum: dateValue
            })
        },
        maximum: (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;
            const dateValue = new Date(input);

            setDateOfBirthValues({
                ...dateOfBirthValues,
                maximum: dateValue
            })
        },
    }

    const [jobTitle, setJobTitle] = useState("");

    const handleClear = () => {
        setSalaryValues({
            minimum: 0,
            maximum: 0
        })
        setSalaryInputValues({
            minimum: "R$ 0,00",
            maximum: "R$ 0,00"
        })
        setDateOfBirthValues({
            minimum: null,
            maximum: null
        })
        setJobTitle("")
    }

    const hasFilter = Boolean(salaryValues.maximum || salaryValues.minimum || dateOfBirthValues.maximum || dateOfBirthValues.minimum || jobTitle);

    useEffect(() => {
        setFiltersValues(
            {
                Salary: {
                    minimum: salaryValues.minimum,
                    maximum: salaryValues.maximum,
                },
                DateOfBirth: {
                    minimum: dateOfBirthValues.minimum,
                    maximum: dateOfBirthValues.maximum,
                },
                jobTitle: jobTitle
            }
        )
    }, [setFiltersValues, salaryValues, dateOfBirthValues, jobTitle])

    return (
        <Container ref={ref}>
            <Sidebar open={open}>
                <FilterTitle>Filtros</FilterTitle>
                <FilterContainer className="dateOfBirth">
                    <p>Filtrar Data de Nascimento</p>
                    <div>
                        <label>Mínimo</label>
                        <InputItem type="date"
                            value={dateOfBirthValues.minimum?.toISOString().split('T')[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")}
                            onChange={handleChangeDateOfBirth.minimum} />
                        <label>Máximo</label>
                        <InputItem type="date"
                            value={dateOfBirthValues.maximum?.toISOString().split('T')[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")}
                            onChange={handleChangeDateOfBirth.maximum} />
                    </div>
                </FilterContainer>

                <FilterContainer className="salary">
                    <p>Filtrar Salario</p>
                    <div>
                        <label>Mínimo</label>
                        <InputItem type="text" value={salaryInputValues.minimum} onChange={handleChangeSalary.minimum} placeholder="R$ 0,00" />
                        <label>Máximo</label>
                        <InputItem type="text" value={salaryInputValues.maximum} onChange={handleChangeSalary.maximum} placeholder="R$ 0,00" />
                    </div>
                </FilterContainer>

                <FilterContainer className="jobTitle">
                    <p>Filtrar Cargo</p>
                    <div>
                        <InputItem type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Cargo" />
                    </div>
                </FilterContainer>

                {hasFilter && (<ButtonClean title="Limpar filtros" onClick={handleClear}><MdFilterAltOff /></ButtonClean>)}
            </Sidebar>
        </Container>
    );
}