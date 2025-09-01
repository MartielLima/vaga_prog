import { useState, useEffect } from 'react'
import {  Table } from './styled';
import { FaPen } from "react-icons/fa";
import { useSearch } from '../../context/SearchContext';

type Funcionario = {
  id: number;
  nome: string;
  dataNascimento: string;
  salario: number;
  funcao: string;
};

function TableComponent() {
  const [itensTabela, setItensTabela] = useState([] as Funcionario[]);
  const { search } = useSearch();

  const itensFiltrados = itensTabela.filter(item =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8085/all');
      const json = await response.json();
      setItensTabela(json);
    };
    fetchData();
  }, []);

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Data de Nascimento</th>
            <th>Salario</th>
            <th>Função</th>
            <th>Editar</th>
          </tr>
        </thead>
        <tbody>
          {itensFiltrados.map((item, index) => {
            console.log(index)
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nome}</td>
                <td>{item.dataNascimento}</td>
                <td>{item.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>{item.funcao}</td>
                <td>
                  <button onClick={() => console.log("Editar", item.id)}><FaPen /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default TableComponent;
