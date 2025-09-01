import Header from './components/Header';
import Table from './components/Table';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Header />
      <Table />
    </SearchProvider>
  )
}

export default App
