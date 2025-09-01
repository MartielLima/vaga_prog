import styled from 'styled-components';
import { secondaryColor } from '../../config/color';

export const Button = styled.button`
  background-color: ${secondaryColor};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background-color: darken(${secondaryColor}, 10%);
  }
`;