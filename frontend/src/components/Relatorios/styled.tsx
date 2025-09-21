import styled from 'styled-components';
import { primaryColor } from '../../config/color';

export const Container = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000048;
  opacity: ${(p) => (p.open ? 1 : 0)};
  visibility: ${(p) => (p.open ? "visible" : "hidden")};
  transition: opacity 0.25s ease, visibility 0.25s ease;
  z-index: 900;
  pointer-events: ${(p) => (p.open ? "auto" : "none")};
`;

export const Content = styled.div<{ open: boolean }>`
  position: fixed;
  top: 5%;
  right: 5%;
  width: 90%;
  height: 90%;
  background-color: #ffffff;
  box-shadow: -4px 0 12px rgba(0,0,0,0.2);
  padding: 20px;
  transform: ${(p) => (p.open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 1001;
  border-radius: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  h1 {
    font-family: "Montserrat", sans-serif;
    color: ${primaryColor};
    font-size: 5rem;
  }

  .subContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 80%;
    height: 80%;
  }
`;

export const CardContainer = styled.div`
  margin: 10px;
  height: 50%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  color: ${primaryColor};
  font-size: 5rem;
  box-shadow: 1px 1px 3px 2px #0000003f;
  border-radius: 10px;
  padding: 5px;

  button {
    font-size: 20px;
    background-color: #31d131;
    padding: 5px;
    border-radius: 6px;
  }

  button:hover {
    background-color: #2bb82b;
  }

  input, select {
    width: 80%;
    height: 10%;
    border-radius: 5px;
    border: #0000004e 1px solid;
    font-size: clamp(10px, 2vw, 20px);
    text-align: center;
  }

  p, label {
    font-size: 20px;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  }

  &:hover {
    transition: 500ms;
    height: 90%;
    font-size: 8rem;
    background-color: #e3e3e3;
    flex: 1.2;
  }
`