import { Form, Overlay, ButtonDelete } from "./styled"
import { IoMdClose } from "react-icons/io";

function FormComponent({ infos, setDeleteInfos }: { infos: { id: number, name: string }, 
  setDeleteInfos: React.Dispatch<React.SetStateAction<{ id: number, name: string } | null>>}) {  
  const deleteUser = async (id: number) => {
    await fetch(`http://127.0.0.1:8085/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
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
          <button  className="delete-button" type="submit">Apagar</button>
          <button type="button" onClick={() => setDeleteInfos(null)}>Cancelar</button>
        </ButtonDelete>

      </Form>
    </Overlay>
  );
}

export default FormComponent;
