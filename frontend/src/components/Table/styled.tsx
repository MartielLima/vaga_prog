import styled from "styled-components";

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  font-size: 0.9rem;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  thead {
    background-color: #007bff;
    color: #fff;
    text-align: left;
  }

  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid #ddd;
  }

  tbody tr:nth-child(even) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }

  .delete-button {
    background: none;
    border: none;
    color: #fa4141;
    cursor: pointer;

    &:hover {
      color: darken(#fa4141, 10%);
    }
  }
`;