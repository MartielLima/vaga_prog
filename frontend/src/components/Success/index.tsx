import type { MotionProps } from "framer-motion";
import { Container } from "./styled";

type SuccessMessageProps = MotionProps & {
    children?: React.ReactNode;
};

const SuccessMessage = ({ children, ...props }: SuccessMessageProps) => {
    return <Container {...props}>{children ?? "Sucesso"}</Container>;
};

export default SuccessMessage;