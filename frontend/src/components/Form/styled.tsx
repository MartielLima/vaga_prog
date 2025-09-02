import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

export const Form = styled.form`
  background: #fff;
  padding: 25px 30px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
  width: 350px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    margin: 0 0 10px 0;
    text-align: center;
    color: #333;
  }

  label {
    font-weight: 500;
    color: #555;
  }

  input {
    padding: 8px 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    width: 100%;
    box-sizing: border-box;
  }
  input[readonly] {
      background-color: #f2f2f2;
      border: 1px solid #ccc;
      color: #555;
  }

  div{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s;

    &[type="submit"] {
      background-color: #4CAF50;
      color: #fff;

      &:hover {
        background-color: #45a049;
      }
    }

    &[type="button"] {
      background-color: #f44336;
      color: #fff;

      &:hover {
        background-color: #e53935;
      }
    }
  }
`;

export const ButtonDelete = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    transition: 0.2s;

    &[type="submit"] {
      background-color: #f44336;
      color: #fff;

      &:hover {
        background-color: #e53935;
      }
    }
    
    &[type="button"] {
      background-color: #4CAF50;
      color: #fff;
  
      &:hover {
        background-color: #45a049;
      }
    }
  }
`;
