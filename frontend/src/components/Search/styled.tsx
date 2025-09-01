import styled from 'styled-components';
import { primaryColor } from '../../config/color';

export const Search = styled.input`
  flex: 2;
  background-color: #f1f1f1;
  padding: 15px;
  border: none;
  border-radius: 5px;
  color: ${primaryColor};
  font-size: 16px;

  &::placeholder {
    color: ${primaryColor};
    opacity: 0.7;
  }
`;
