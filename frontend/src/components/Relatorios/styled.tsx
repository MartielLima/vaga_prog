import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Sidebar = styled.div<{ open: boolean }>`
  position: fixed;
  top: 5%;
  width: 90%;
  height: 90%;
  background-color: #ffffff;
  box-shadow: -4px 0 12px rgba(0,0,0,0.2);
  padding: 20px;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s ease;
  z-index: 1000;
  border-radius: 8px;
`;