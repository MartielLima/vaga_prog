import { useState } from 'react'
import Header from './components/Header';
import Table from './components/Table';
import { SearchProvider } from './context/SearchContext';
import { LoadProvider } from './context/LoadContext';
import { ErrorProvider } from './context/ErrorContext';
import FormCreateUser from './components/Form/FormCreateUser';
import type { Funcionario } from './components/Table/type';
import { useError } from "./context/ErrorContext";
import type { AppError } from "./context/type";
import { ErrorPopup } from './components/ErrorScream/ErrorPop-up';
import { ErrorDetail } from './components/ErrorScream';


function App() {
  const [createId, setCreateId] = useState<boolean>(false);
  const [itensTabela, setItensTabela] = useState([] as Funcionario[]);
  const [detailIndex, setDetailIndex] = useState<number | null>(null);
  const { errors, setErrors } = useError();

  const closeError = (index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8085/all');

      if (!response.ok) {
        const data: AppError = await response.json();
        const newErrorList: AppError[] = [...errors, data]
        setErrors(newErrorList);
      } else {
        const json = await response.json();
        setItensTabela(json);
      }

      console.log(errors)

    } catch (err) {
      if (err instanceof Error) {
        const newErrorList: AppError[] = [...errors, { message: "Erro ao deletar usuário:", infos: err.message }]
        setErrors(newErrorList);
      }
      return null;
    }
  };

  return (
    <ErrorProvider>
      <SearchProvider>
        <LoadProvider>
          {errors.length !== 0 && <ErrorPopup errors={errors} onClose={closeError} onOpenDetail={(index) => setDetailIndex(index)} />}
          {detailIndex !== null && <ErrorDetail error={errors[detailIndex]} onClose={() => setDetailIndex(null)} />}
          <Header setCreateId={setCreateId} fetchData={fetchData} />
          {createId && (
            <FormCreateUser setCreateId={setCreateId} />
          )}
          <Table createId={createId} fetchData={fetchData} itensTabela={itensTabela} />
        </LoadProvider>
      </SearchProvider>
    </ErrorProvider>
  )
}

export default App
