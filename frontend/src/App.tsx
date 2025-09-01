import { useState } from 'react'
import Header from './components/Header';
import Table from './components/Table';
import { SearchProvider } from './context/SearchContext';
import FormCreateUser from './components/Form/FormCreateUser';

function App() {
  const [createId, setCreateId] = useState<boolean>(false);
  return (
    <SearchProvider>
      <Header setCreateId={setCreateId} />
      {createId && (
        <FormCreateUser setCreateId={setCreateId} />
      )}
      <Table createId={createId} />
    </SearchProvider>
  )
}

export default App
