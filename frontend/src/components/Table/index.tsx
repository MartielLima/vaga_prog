import { useState, useEffect } from 'react'
import {  Table } from './styled';
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useSearch } from '../../context/SearchContext';
import FormEditUser from '../Form/FormEditUser';
import FormDeleteUser from '../Form/FormDeleteUser';


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
  const [deleteInfos, setDeleteInfos] = useState<{ id: number, name: string } | null>(null);

  const itensFiltrados = itensTabela.filter(item =>
    item.nome.toLowerCase().includes(search.toLowerCase())
  );

  const fetchData = async () => {
      const response = await fetch('http://127.0.0.1:8085/all');
      const json = await response.json();
      setItensTabela(json);
    };

  useEffect(() => {
    if (editandoId === null || deleteInfos === null || createId === false || itensTabela.length === 0) {
      fetchData();
    }
  }, [editandoId, createId, itensTabela, deleteInfos]);

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
            <th>Excluir</th>
          </tr>
        </thead>
        <tbody>
          {itensFiltrados.map((person, index) => {
            return (
              <tr key={person.id}>
                <td>{index + 1}</td>
                <td>{person.nome}</td>
                <td>{person.dataNascimento}</td>
                <td>{person.salario.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</td>
                <td>{person.funcao}</td>
                <td>
                  <button onClick={() => setEditandoId(person.id)}><FaPen /></button>
                </td>
                <td>
                  <button className='delete-button' onClick={() => setDeleteInfos({id: person.id, name: person.nome})}><FaTrashCan /></button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      {editandoId && (
        <FormEditUser id={editandoId} setEditandoId={setEditandoId} />
      )}
      {deleteInfos && (
        <FormDeleteUser infos={deleteInfos} setDeleteInfos={setDeleteInfos} />
      )}
    </>
  );
}

export default TableComponent;
