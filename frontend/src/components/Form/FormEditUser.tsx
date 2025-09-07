import { useState, useEffect } from "react";
import { Form, Overlay, Buttons } from "./styled";
import { IoMdClose } from "react-icons/io";
import formatCurrency from "../../Util/formatCurrency";
import { useError } from "../../context/ErrorContext";
import type { AppError } from "../../context/type";
import type { ResponseToJSONProps } from "./type";
import type { Funcionario } from "../Table/type";

function FormComponent({ id, setEditandoId }: { id: number, setEditandoId: React.Dispatch<React.SetStateAction<number | null>> }) {
  const { errors, setErrors } = useError();
  const [valor, setValor] = useState("R$ 0,00");
  const [formData, setFormData] = useState<Funcionario>({
    id: 0,
    nome: "",
    dataNascimento: "",
    salario: 0,
    funcao: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8085/${id}`);

        if (!response.ok) {
          const data: AppError = await response.json();
          const newErrorList: AppError[] = [...errors, data]
          setErrors(newErrorList);
        } else {
          const json: ResponseToJSONProps = await response.json();
          console.log(json.funcionario)
          setFormData(json.funcionario);
        }

      } catch (err) {
        if (err instanceof Error) {
          const newErrorList: AppError[] = [...errors, { message: "Erro ao deletar usuário:", infos: err.message }]
          setErrors(newErrorList);
        }
        return null;
      }
    };
    fetchData();
  }, [id, errors, setErrors]);

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
