import { useState, useEffect } from 'react'
import Header from './components/Header';
import Table from './components/Table';
import FormCreateUser from './components/Form/FormCreateUser';
import type { Funcionario } from './components/Table/type';
import { useError } from "./context/ErrorContext";
import type { AppError } from "./context/type";
import { ErrorPopup } from './components/ErrorScream/ErrorPop-up';
import { ErrorDetail } from './components/ErrorScream';

export type ResponseToJSONPropsGetAll = {
  funcionario: Funcionario[]
  status: string
}

// TODO continuar a logica para melhor fucionamento do Error popup

function App() {
  const [createId, setCreateId] = useState<boolean>(false);
  const [itensTabela, setItensTabela] = useState([] as Funcionario[]);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const { viewError, setViewError } = useState<AppError | null>(null);
  const { showPopup, setShowPopup } = useState(false);
  const { errors, setErrors } = useError();

  const closeError = (index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const deleteError = (index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8085/all');

      if (!response.ok) {
        const data: AppError = await response.json();
        setErrors(prev => [...prev, data]);

      } else {
        const json: ResponseToJSONPropsGetAll = await response.json();
        setItensTabela(json.funcionario);
      }

    } catch (err) {
      if (err instanceof Error) {
        const data: AppError = { message: "Erro ao deletar usuário:", infos: err.message }
        setErrors(prev => [...prev, data]);
      }
      return null;
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const lastErrorIndex = errors.length - 1;
      setViewError(errors[lastErrorIndex]);
      deleteError(lastErrorIndex);
    };
  })

  return (

    <>
      {detailIndex !== null && (
        <ErrorDetail error={errors[detailIndex]} onClose={() => setDetailIndex(null)} />
      )}
      <Header setCreateId={setCreateId} fetchData={fetchData} />
      {createId && (
        <FormCreateUser setCreateId={setCreateId} />
      )}
      {viewError && (
        <>
          <ErrorPopup
            errors={errors}
            onClose={closeError}
            setViewError={setViewError}
            onOpenDetail={(index) => setDetailIndex(index)}
          />
        </>
      )}
      <Table createId={createId} fetchData={fetchData} itensTabela={itensTabela} />
    </>

  )
}

export default App
