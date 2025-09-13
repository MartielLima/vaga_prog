
import { RiFilter2Fill } from "react-icons/ri";
import styled from 'styled-components';
import { secondaryColor } from '../../config/color';

export const Button = styled.button`
  background-color: ${secondaryColor};
  border: none;
  color: #fff;
  font-weight: bold;
  cursor: pointer;


  &:hover {
    background-color: darken(${secondaryColor}, 10%);
  }
`;

// TODO Configurar filtros

export default function ButtonFilter({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick}>
      <RiFilter2Fill />
    </Button>
  );
}
