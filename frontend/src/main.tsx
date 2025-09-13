import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SearchProvider } from './context/SearchContext';
import { LoadProvider } from './context/LoadContext';
import { ErrorProvider } from './context/ErrorContext';
import { FilterProvider } from './context/FilterContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <ErrorProvider>
        <SearchProvider>
          <LoadProvider>
            <App />
          </LoadProvider>
        </SearchProvider>
      </ErrorProvider>
    </FilterProvider>
  </StrictMode>,
)
