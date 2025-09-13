import {
    Container,
    Sidebar,
    FilterTitle,
    InputItem,
    FilterContainer,
    ButtonClean,
    ButtonAplicar,
    ButtonContainer
} from "./styled"
import { useState, useCallback } from "react";
import { MdFilterAltOff } from "react-icons/md";
import { useFiltersValues } from "../../context/FilterContext";
import OutsideClick from "../../hooks/OutsideClick";
import formatDate from "../../Util/formatDate";

// TODO, Filtros lançados no estado global, agora basta verificar o erro do componente no log.
// TODO, Mostrar os possíveis erros do formulário usando o errosOnFilter

type filterSalary = {
    minimum: number,
    maximum: number
}

type filterInputSalary = {
    minimum: string,
    maximum: string
}

type filterDateOfBirth = {
    minimum: string | undefined,
    maximum: string | undefined
}

export default function RightMenuFilter({ open, toggleFilter }: { open: boolean, toggleFilter: () => void }) {
    const { filtersValues, setFiltersValues } = useFiltersValues();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [errosOnFilter, setErrosOnFilter] = useState<string[]>([]);
    const ref = OutsideClick(toggleFilter);

    const today = new Date();
    const year = today.getFullYear();
    const mouth = today.getMonth();
    const day = today.getDay()
    const minDate = formatDate(new Date(year - 90, mouth, day));
    const maxDate = formatDate(new Date(year - 16, mouth, day));

    const [salaryValues, setSalaryValues] = useState<filterSalary>({
        minimum: filtersValues.Salary.minimum,
        maximum: filtersValues.Salary.maximum
    })
    const [salaryInputValues, setSalaryInputValues] = useState<filterInputSalary>({
        minimum: filtersValues.Salary.minimum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }),
        maximum: filtersValues.Salary.maximum.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        })
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
        minimum: filtersValues.DateOfBirth.minimum?.toISOString(),
        maximum: filtersValues.DateOfBirth.maximum?.toISOString()
    })
    const handleChangeDateOfBirth = {
        minimum: (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;

            setDateOfBirthValues({
                ...dateOfBirthValues,
                minimum: input
            })
        },
        maximum: (e: React.ChangeEvent<HTMLInputElement>) => {
            const input = e.target.value;

            setDateOfBirthValues({
                ...dateOfBirthValues,
                maximum: input
            })
        },
    }

    const [jobTitle, setJobTitle] = useState(filtersValues.jobTitle);

    const handleClear = () => {
        setFiltersValues(
            {
                Salary: {
                    minimum: 0,
                    maximum: 0,
                },
                DateOfBirth: {
                    minimum: null,
                    maximum: null,
                },
                jobTitle: ""
            }
        )
        setSalaryValues({
            minimum: 0,
            maximum: 0
        })
        setSalaryInputValues({
            minimum: "R$ 0,00",
            maximum: "R$ 0,00"
        })
        setDateOfBirthValues({
            minimum: "",
            maximum: ""
        })
        setJobTitle("")
    }

    const hasFilter = Boolean(salaryValues.maximum || salaryValues.minimum || dateOfBirthValues.maximum || dateOfBirthValues.minimum || jobTitle);

    const applyFilters = useCallback(() => {
        // Validação do Salario
        if (salaryValues.minimum) {
            const value = salaryValues.minimum;
            if (value < 0) setErrosOnFilter(prev => [...prev, "O valor mínimo tem que ser maior que 0!"]);
            if (value > salaryValues.maximum)
                setErrosOnFilter(prev => [...prev, "O valor do salario menor tem que ser menor do que o maior!"]);
        }
        if (salaryValues.maximum) {
            const value = salaryValues.maximum;
            if (value < 0) setErrosOnFilter(prev => [...prev, "O valor máximo tem que ser maior que 0!"]);
            if (value < salaryValues.minimum)
                setErrosOnFilter(prev => [...prev, "O valor do salario maior tem que ser maior do que o maior!"]);
        }

        const today = new Date();
        // Validação de Data
        if (dateOfBirthValues.minimum) {
            const date = new Date(dateOfBirthValues.minimum);
            let age: number = today.getFullYear() - date.getFullYear();

            const currentMonth = today.getMonth();
            const monthOfBirth = date.getMonth();

            if (currentMonth < monthOfBirth || (currentMonth === monthOfBirth && today.getDate() < date.getDate())) {
                age--;
            }

            if (age < 16) setErrosOnFilter(prev => [...prev, "Não contem funcionario com menor de 16 anos!"]);
        }
        if (dateOfBirthValues.maximum) {
            const date = new Date(dateOfBirthValues.maximum);
            let age: number = today.getFullYear() - date.getFullYear();

            const currentMonth = today.getMonth();
            const monthOfBirth = date.getMonth();

            if (currentMonth < monthOfBirth ||
                (currentMonth === monthOfBirth && today.getDate() < date.getDate()))
                age--;
            if (age < 16)
                setErrosOnFilter(prev => [...prev, "Não contem funcionario com menor de 16 anos!"]);
            if (dateOfBirthValues.minimum &&
                date.getTime() < new Date(dateOfBirthValues.minimum).getTime())
                setErrosOnFilter(prev => [...prev, "A data tem que ser maior do que a minima!"]);
        }

        setFiltersValues(
            {
                Salary: {
                    minimum: salaryValues.minimum,
                    maximum: salaryValues.maximum,
                },
                DateOfBirth: {
                    minimum: dateOfBirthValues.minimum ? new Date(dateOfBirthValues.minimum) : null,
                    maximum: dateOfBirthValues.maximum ? new Date(dateOfBirthValues.maximum) : null,
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
                        <label>de</label>
                        <InputItem type="date"
                            value={dateOfBirthValues.minimum?.split('T')[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")}
                            onChange={handleChangeDateOfBirth.minimum}
                            min={minDate} max={maxDate} />
                        <label>ate</label>
                        <InputItem type="date"
                            value={dateOfBirthValues.maximum?.split('T')[0].replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")}
                            onChange={handleChangeDateOfBirth.maximum}
                            min={dateOfBirthValues.minimum ? dateOfBirthValues.minimum : minDate} max={maxDate} />
                    </div>
                </FilterContainer>

                <FilterContainer className="salary">
                    <p>Filtrar Salario</p>
                    <div>
                        <label>de</label>
                        <InputItem type="text" value={salaryInputValues.minimum} onChange={handleChangeSalary.minimum} placeholder="R$ 0,00" />
                        <label>ate</label>
                        <InputItem type="text" value={salaryInputValues.maximum} onChange={handleChangeSalary.maximum} placeholder="R$ 0,00" />
                    </div>
                </FilterContainer>

                <FilterContainer className="jobTitle">
                    <p>Filtrar Cargo</p>
                    <div>
                        <InputItem type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} placeholder="Cargo" />
                    </div>
                </FilterContainer>

                {hasFilter && (
                    <ButtonContainer>
                        <ButtonClean title="Limpar filtros" onClick={handleClear}><MdFilterAltOff /></ButtonClean>
                        <ButtonAplicar title="Aplicar filtros" onClick={applyFilters}>Aplicar</ButtonAplicar>
                    </ButtonContainer>
                )}
            </Sidebar>
        </Container>
    );
}