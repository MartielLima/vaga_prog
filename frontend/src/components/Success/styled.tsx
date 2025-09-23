import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div) <React.ComponentProps<typeof motion.div>>`
  position: fixed;
  top: 0px;
  right: 8.5rem;
  height: 80px;
  background-color: limegreen;
  cursor: none;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden; 
  padding: 0 10px;
  box-shadow: 2px 2px 1px #00000058;

  p {
    flex: 1;
    text-align: center;
    justify-content: center;
    color: #f2f2f2;
    font-size: 16px;
    margin: 8px 0;
  }
`;
