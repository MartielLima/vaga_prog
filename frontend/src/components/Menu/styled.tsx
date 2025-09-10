import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Sidebar = styled.div<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  width: 260px;
  height: 100%;
  background-color: #ffffff;
  box-shadow: -4px 0 12px rgba(0,0,0,0.2);
  padding: 20px;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 1000;
`;

export const MenuTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li`
  padding: 10px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const InputItem = styled.input`
  padding: 2px 10px;
  border-radius: 6px;
  border: #e4e5e7 solid 1px;
  cursor: pointer;
  transition: background-color 0.2s;
  width: 90%;

  &:hover {   
    background-color: #e4e5e7;
    border: #cecfcf solid 1px;
  }
`;

export const FilterContainer = styled.div`
  background-color: #f3f4f6;
  border: #dbdbdd solid 1px;
  padding: 5px;
  margin: 5px;
  border-radius: 10px;

  div {
      padding-left: 15px;
  }
`;

export const ButtonClean = styled.button`
  margin-top: 20px;
  padding: 2px 5px;
  background-color: #5eff1e;
  border-radius: 8px;
  border: #3ea515 solid 1px;
  font-size: 25px;
`;