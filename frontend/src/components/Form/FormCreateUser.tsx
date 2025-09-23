import { useState } from "react"
import { Form, Overlay, Buttons } from "./styled"
import { IoMdClose } from "react-icons/io";
import ErrorComponent from "../ErrorComponent";
import CalculateAge from "../../Util/CalculateAge";
import { useError } from "../../context/ErrorContext"
import type { AppError } from "../../context/type"
import { useSuccess } from "../../context/SuccessContext";
import formatDate from "../../Util/formatDate";

//{ id, setEditandoId }: { id: number, setEditandoId: React.Dispatch<React.SetStateAction<number | null>> }

function FormCreateUser({ setCreateId }: { setCreateId: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [formData, setFormData] = useState({
    nome: "",
    dataNascimento: "",
    salario: 0,
    funcao: ""
  });
  const [createUserError, setCreateUserError] = useState<string[]>([]);
  const [valor, setValor] = useState("R$ 0,00");
  const { errors, setErrors } = useError();
  const { setSuccess } = useSuccess()

  const today = new Date();
  const year = today.getFullYear();
  const mouth = today.getMonth();
  const day = today.getDay()
  const minDate = formatDate(new Date(year - 90, mouth, day));
  const maxDate = formatDate(new Date(year - 16, mouth, day));


  const setUserIntoDB = async (user: typeof formData) => {
    try {
      await fetch(`http://127.0.0.1:8085/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      setSuccess(true)
    } catch (err) {
      if (err instanceof Error) {
        const newErrorList: AppError[] = [...errors, { message: "Erro ao enviar usuário:", infos: err.message }]
        setErrors(newErrorList);
      }
      return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: string[] = [];

    if (!formData.nome && !formData.dataNascimento && !formData.salario && !formData.funcao) {
      setCreateUserError(["Todos os campos são obrigatórios"]);
      return;
    }

    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];

      if (!value && key !== "salario") {
        newErrors.push(`O campo ${key} é obrigatório`);
      }

      if (key === "dataNascimento" && CalculateAge(String(value)) < 16) {
        newErrors.push(`O campo ${key} deve ser maior que 16 anos`);
      }

      if (key === "salario" && Number(value) <= 0) {
        newErrors.push(`O campo ${key} deve ser maior que zero`);
      }
    });

    if (newErrors.length > 0) {
      setCreateUserError(newErrors);
      return;
    }

    setUserIntoDB(formData);
    setCreateId(false);
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
        <button className="close-button" type="button" onClick={() => setCreateId(false)}><IoMdClose size={24} color="#cf2d2d" /></button>

        <h2>Criar Usuário</h2>

        <label>Nome</label>
        <input type="text" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />

        <label>Data de Nascimento</label>
        <input type="date" value={formData.dataNascimento} onChange={(e) => setFormData({ ...formData, dataNascimento: e.target.value })} min={minDate} max={maxDate} />

        <label>Salário</label>
        <input type="text" value={valor} onChange={handleChange} step="0.01" placeholder="R$ 0,00" />

        <label>Função</label>
        <input type="text" value={formData.funcao} onChange={(e) => setFormData({ ...formData, funcao: e.target.value })} />

        {createUserError.length > 0 && <ErrorComponent error={createUserError} />}

        <Buttons>
          <button type="submit">Salvar</button>
        </Buttons>
      </Form>
    </Overlay>
  );
}

export default FormCreateUser;
