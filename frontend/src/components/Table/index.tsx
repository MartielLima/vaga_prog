import { useState, useEffect } from 'react'
import { Table } from './styled';
import { FaPen } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useSearch } from '../../context/SearchContext';
import FormEditUser from '../Form/FormEditUser';
import FormDeleteUser from '../Form/FormDeleteUser';
import type { Funcionario } from './type';
import { useFiltersValues } from '../../context/FilterContext';

function TableComponent({ createId, fetchData, itensTabela }: { createId: boolean, fetchData: () => void, itensTabela: Funcionario[] }) {
  const { search } = useSearch();
  const { filtersValues } = useFiltersValues();
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [deleteInfos, setDeleteInfos] = useState<{ id: number, name: string } | null>(null);
  const [previousValue, setPreviousValue] = useState<{ [key: string]: unknown }>({})

  const itensFiltrados = itensTabela.filter(funcionario => {
    const dateBirthFuncionario = new Date(funcionario.dataNascimento);
    return funcionario.nome.toLowerCase().includes(search.toLowerCase()) &&
      (
        filtersValues.Salary.maximum ?
          filtersValues.Salary.maximum >= funcionario.salario
          : true
      ) && (
        filtersValues.Salary.minimum ?
          filtersValues.Salary.minimum <= funcionario.salario
          : true
      ) && (
        filtersValues.DateOfBirth.minimum ?
          filtersValues.DateOfBirth.minimum.getTime() <= dateBirthFuncionario.getTime()
          : true
      ) && (
        filtersValues.DateOfBirth.maximum ?
          filtersValues.DateOfBirth.maximum.getTime() >= dateBirthFuncionario.getTime()
          : true
      ) && (
        filtersValues.jobTitle ?
          funcionario.funcao.toLowerCase().includes(filtersValues.jobTitle.toLowerCase())
          : true
      )
  });

  useEffect(() => {
    if (previousValue.editandoId !== editandoId) {
      setPreviousValue({ ...previousValue, editandoId: editandoId })
      fetchData();
    }
    if (previousValue.createId !== createId) {
      setPreviousValue({ ...previousValue, createId: createId })
      fetchData();
    }
    if (previousValue.deleteInfos !== deleteInfos) {
      setPreviousValue({ ...previousValue, deleteInfos: deleteInfos })
      fetchData();
    }

  }, [editandoId, createId, deleteInfos, fetchData, previousValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
                  <button className='delete-button' onClick={() => setDeleteInfos({ id: person.id, name: person.nome })}><FaTrashCan /></button>
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
