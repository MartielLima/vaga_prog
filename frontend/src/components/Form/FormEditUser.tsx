import { useState, useEffect } from "react"
import { Form, Overlay, Buttons } from "./styled"
import { IoMdClose } from "react-icons/io";
import formatCurrency from "../../Util/formatCurrency";

function FormComponent({ id, setEditandoId }: { id: number, setEditandoId: React.Dispatch<React.SetStateAction<number | null>> }) {
  const [valor, setValor] = useState("R$ 0,00");
  const [formData, setFormData] = useState({
    id: "",
    nome: "",
    dataNascimento: "",
    salario: 0,
    funcao: ""
  });
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://127.0.0.1:8085/${id}`);
      const json = await response.json();
      setFormData(json);
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    setValor(formatCurrency(formData.salario));
  }, [formData.salario]);

  const setUserIntoDB = async (user: typeof formData) => {
    await fetch(`http://127.0.0.1:8085/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        salario: user.salario,
        funcao: user.funcao
      })
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserIntoDB(formData);
    setEditandoId(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value;
    input = input.replace(/\D/g, '');

    const numberValue = Number(input) / 100;

    const formattedValue = numberValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

    setFormData({ 
      ...formData, 
      salario: numberValue 
    });

    setValor(formattedValue);
  };

  return (
    <Overlay>
      <Form onSubmit={handleSubmit}>
        <button className="close-button" type="button" onClick={() => setEditandoId(null)}><IoMdClose size={24} color="#cf2d2d" /></button>

        <h2>Editar Usuário</h2>
        <label>ID</label>
        <input type="text" value={formData.id} readOnly />

        <label>Nome</label>
        <input type="text" value={formData.nome} readOnly />

        <label>Data de Nascimento</label>
        <input type="date" value={formData.dataNascimento.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$3-$2-$1")} readOnly />

        <label>Salário</label>
        <input type="text" value={valor} onChange={handleChange} placeholder="R$ 0,00" />

        <label>Função</label>
        <input type="text" value={formData.funcao} onChange={(e) => setFormData({ ...formData, funcao: e.target.value })} />

        <Buttons>
          <button type="submit">Salvar</button>
        </Buttons>

      </Form>
    </Overlay>
  );
}

export default FormComponent;
