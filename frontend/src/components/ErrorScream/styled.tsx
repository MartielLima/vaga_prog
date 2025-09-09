import styled from "styled-components";

export const PopupContainer = styled.div` 
  position: fixed;
  top: 80px;
  left: 5px;
  background: rgba(255, 0, 0, 0.9);
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px;
  z-index: 9999;

  .actions {
    font-size: 0.8em;
    margin-top: 5px;
  }

  .actions span {
    text-decoration: underline;
    cursor: pointer;
    margin: 0 5px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;

  .container {
    background: #ffd4d4;
    padding: 20px;
    border-radius: 8px;
    max-width: 600px;
    width: 90%;
    max-height: 80%;
    overflow-y: auto;
  }

  .message {
    padding: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    overflow-wrap: break-word;
    background-color: #e2bcbc;
    border-radius: 3px;
    border: #c7a4a4 1px solid;
  }

  button {
    padding: 6px 0 0 0;
  }
`;

// dbdbdb
