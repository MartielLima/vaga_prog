import { Container, Sidebar, MenuTitle, MenuList, MenuItem } from "./styled"
import OutsideClick from "../../hooks/OutsideClick";
import type { AppError } from "../../context/type";
import { useError } from "../../context/ErrorContext";

import { HiOutlineDocumentReport } from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { useIsStopped } from "../../context/StopHighFetchContext";

type Props = {
    open: boolean;
    toggleMenu: () => void;
    toggleRelatorio: () => void;
}

export default function RightMenu({ open, toggleMenu, toggleRelatorio }: Props) {
    const { errors, setErrors } = useError();
    const { setIsStopped } = useIsStopped();
    const ref = OutsideClick(toggleMenu);

    const handleRegisterMultipleUsers = async () => {
        try {
            setIsStopped(true)
            const response = await fetch(`http://127.0.0.1:8085/cadastrarUsuarios`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            if (!response.ok) {
                const data: AppError = await response.json();
                setErrors(prev => [...prev, data]);
            }
            setIsStopped(false)
        } catch (err) {
            setIsStopped(false)
            if (err instanceof Error) {
                const newErrorList: AppError[] = [...errors, { message: "Erro ao enviar usuário:", infos: err.message }]
                setErrors(newErrorList);
            }
        }
    }
    // TODO criar tela e função para aumento para todos os funcionarios
    return (
        <Container ref={ref}>
            <Sidebar open={open}>
                <MenuTitle>Menu</MenuTitle>
                <MenuList>
                    <MenuItem onClick={handleRegisterMultipleUsers} >
                        <FaUsers />
                        <p>Cadastrar vários Usuarios</p>
                    </MenuItem>
                    <MenuItem onClick={toggleRelatorio}>
                        <HiOutlineDocumentReport />
                        <p>Relatórios</p>
                    </MenuItem>
                    <MenuItem>
                        <FaMoneyBillTrendUp />
                        <p>Aumento para todos os funcionarios</p>
                    </MenuItem>
                </MenuList>
            </Sidebar>
        </Container>
    );
}