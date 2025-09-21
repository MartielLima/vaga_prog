import styled from "styled-components";

export const MainContainer = styled.div`
  width: 210mm;
  min-height: 297mm;
  margin: auto;
  padding: 10px;
  background: linear-gradient(135deg, #fff6f0 0%, #fffef6 100%);
  font-family: "Inter", "Segoe UI", Roboto, Arial, sans-serif;
  color: #2b2b2b;
`

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
`;

export const CentralizedContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

export const Title = styled.h1`
  font-size: 25px;
  padding: 20px;
`

export const Message = styled.p`
  padding: 40px 0;
  text-align: justify;
  margin: 0 auto 12px;
  max-width: 640px;
  font-size: 15px;
  line-height: 1.45;
  color: #444;
`

export const FooterContainer = styled.div`
  font-weight: 600;
  font-size: 14px;
  text-align: center;
`

export const ButtonGen = styled.button`
  font-size: 20px;
  background-color: #31d131;
  padding: 5px;
  border-radius: 6px;

  &:hover {
    background-color: #2bb82b;
  }
`