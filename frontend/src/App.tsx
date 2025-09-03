import { useState } from 'react'
import Header from './components/Header';
import Table from './components/Table';
import { SearchProvider } from './context/SearchContext';
import FormCreateUser from './components/Form/FormCreateUser';
import type { Funcionario } from './components/Table/type';

function App() {
  const [createId, setCreateId] = useState<boolean>(false);
  const [itensTabela, setItensTabela] = useState([] as Funcionario[]);

  const fetchData = async () => {
    const response = await fetch('http://127.0.0.1:8085/all');
    const json = await response.json();
    setItensTabela(json);
  };
  
  return (
    <SearchProvider>
      <Header setCreateId={setCreateId} fetchData={fetchData}  />
      {createId && (
        <FormCreateUser setCreateId={setCreateId} />
      )}
      <Table createId={createId} fetchData={fetchData} itensTabela={itensTabela} />
    </SearchProvider>
  )
}

export default App
