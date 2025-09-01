import styled from 'styled-components';
import { primaryColor } from '../../config/color';

export const Nav = styled.nav`
  background-color: ${primaryColor};
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button{
    background: none;
    border: none;
    text-align: center;
    color: #fff;
    margin: 0 10px 0 0;
    font-weight: bold;
    font-size: 30px;
  }
`;

export const Img = styled.img`
  height: 40px;
  margin-right: 20px;
`;

export const ImgContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

export const ButtonContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;