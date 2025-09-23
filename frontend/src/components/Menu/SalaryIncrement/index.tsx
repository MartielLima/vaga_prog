import { useState } from "react";
import styled from 'styled-components';
import fetchData from "../../../Util/fetchData";

export const Container = styled.div`
    position: relative;
`;


const SalaryIncrement = () => {
    const [value, setValue] = useState<number | undefined>()
    const [stringValue, setStringValue] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const _value = Number(e.target);
        setValue(_value);
        setStringValue(`${_value} %`);
    }

    const applyChange = async () => {
        const allEmployees = await fetchData();

        if (!allEmployees) return;

        for (const employee in allEmployees) {
            console.log(employee)
        }
    }


    return (
        <div>
            <input type="text" onChange={handleChange} value={stringValue} />
            <button onClick={applyChange}>Aumentar</button>
        </div>
    )
}

export default SalaryIncrement;
