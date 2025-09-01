import { useState, useEffect } from 'react'
import {  Table } from './styled';
import { FaPen } from "react-icons/fa";
import { useSearch } from '../../context/SearchContext';
import Form from '../Form';


type Funcionario = {
  id: number;
  nome: string;
  dataNascimento: string;
  salario: number;
  funcao: string;
};

function TableComponent({ createId }: { createId: boolean }) {
  const [itensTabela, setItensTabela] = useState([] as Funcionario[]);
  const { search } = useSearch();
  const [editandoId, setEditandoId] = useState<number | null>(null);

  const itensFiltrados = itensTabela.filter(item =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8085/all');
      const json = await response.json();
      setItensTabela(json);
    };

  useEffect(() => {
    if (editandoId === null || createId === false) {
      fetchData();
    }
  }, [editandoId, createId]);

  useEffect(() => {
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
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.nome}</td>
                <td>{item.dataNascimento}</td>
                <td>{item.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>{item.funcao}</td>
                <td>
                  <button onClick={() => setEditandoId(item.id)}><FaPen /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {editandoId && (
        <Form id={editandoId} setEditandoId={setEditandoId} />
      )}
    </>
  );
}

export default TableComponent;
