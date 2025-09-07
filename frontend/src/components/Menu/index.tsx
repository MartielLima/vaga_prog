import { Container, Sidebar, MenuTitle, MenuList, MenuItem } from "./styled"
import OutsideClick from "../../hooks/OutsideClick";
import type { AppError } from "../../context/type";
import { useError } from "../../context/ErrorContext"



export default function RightMenu({ open, toggleMenu }: { open: boolean, toggleMenu: () => void }) {
    const { errors, setErrors } = useError();
    const ref = OutsideClick(toggleMenu);

    const handleRegisterMultipleUsers = async () => {
        try {
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
        } catch (err) {
            if (err instanceof Error) {
                const newErrorList: AppError[] = [...errors, { message: "Erro ao enviar usuário:", infos: err.message }]
                setErrors(newErrorList);
            }
        }
    }
    return (
        <Container ref={ref}>
            <Sidebar open={open}>
                <MenuTitle>Menu</MenuTitle>
                <MenuList>
                    <MenuItem onClick={handleRegisterMultipleUsers} >Cadastrar vários Usuarios</MenuItem>
                </MenuList>
            </Sidebar>
        </Container>
    );
}