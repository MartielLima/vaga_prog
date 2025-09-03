import { Form, Overlay, ButtonDelete } from "./styled"
import { IoMdClose } from "react-icons/io";
import { useError } from "../../context/ErrorContext"
import type { AppError } from "../../context/type"

function FormComponent({ infos, setDeleteInfos }: {
  infos: { id: number, name: string },
  setDeleteInfos: React.Dispatch<React.SetStateAction<{ id: number, name: string } | null>>
}) {
  const { errors, setErrors } = useError();
  const deleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:8085/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        const data: AppError = await response.json();
        const newErrorList: AppError[] = [...errors, data]
        setErrors(newErrorList);
      }

    } catch (e) {
      const newErrorList: AppError[] = [...errors, { message: "Erro ao deletar usuário:", infos: errors.toString() }]
      setErrors(newErrorList);
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    deleteUser(infos.id);
    setDeleteInfos(null);
  };

  return (
    <Overlay>
      <Form onSubmit={handleSubmit}>
        <button className="close-button" type="button" onClick={() => setDeleteInfos(null)}>
          <IoMdClose size={24} color="#cf2d2d" /></button>

        <h2>Apagar Usuário</h2>
        <p>Tem certeza que deseja apagar o usuário <strong>{infos.name}</strong>?</p>

        <ButtonDelete>
          <button className="delete-button" type="submit">Apagar</button>
          <button type="button" onClick={() => setDeleteInfos(null)}>Cancelar</button>
        </ButtonDelete>

      </Form>
    </Overlay>
  );
}

export default FormComponent;
