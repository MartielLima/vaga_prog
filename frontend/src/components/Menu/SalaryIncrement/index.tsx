import { useState } from "react";
import styled from 'styled-components';
import fetchData from "../../../Util/fetchData";
import OutsideClick from "../../../hooks/OutsideClick";
import type { Funcionario } from "../../Table/type";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    button {
        margin: 5px;
        padding: 5px;
        background-color: lime;
        width: 15vh;
        border-radius: 8px;
    }

    input {
        border: none;
        max-width: 20vh;
        background-color: #f3f4f6
    }

    div {
        display: flex;
        flex-direction: row;
        max-width: 25vh;
        border: 1px black solid;
        padding: 5px;
        border-radius: 8px;
    }
`;


const SalaryIncrement = ({ toggleSalaryIncrement }: { toggleSalaryIncrement: () => void }) => {
    const ref = OutsideClick(toggleSalaryIncrement);
    const [value, setValue] = useState(0)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value)) return;
        setValue(value);
    }

    const setUserIntoDB = async (user: Funcionario) => {
        const id = user.id
        await fetch(`http://127.0.0.1:8085/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                salario: user.salario, // TODO Continuar
                funcao: user.funcao
            })
        });
        setSuccess(true);
    };

    const applyChange = async () => {
        const allEmployees = await fetchData();

        if (!allEmployees) return;

        for (const employee of allEmployees) {
            console.log(employee)
        }
    }


    return (
        <Container ref={ref}>
            <div>
                <input type="text" onChange={handleChange} value={value} />
                <p>%</p>
            </div>
            <button onClick={applyChange}>Aumentar</button>
        </Container>
    )
}

export default SalaryIncrement;
