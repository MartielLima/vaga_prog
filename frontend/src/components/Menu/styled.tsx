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