import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { SearchProvider } from './context/SearchContext';
import { LoadProvider } from './context/LoadContext';
import { ErrorProvider } from './context/ErrorContext';
import { FilterProvider } from './context/FilterContext.tsx';
import { SuccessProvider } from './context/SuccessContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FilterProvider>
      <ErrorProvider>
        <SearchProvider>
          <SuccessProvider>
            <LoadProvider>
              <App />
            </LoadProvider>
          </SuccessProvider>
        </SearchProvider>
      </ErrorProvider>
    </FilterProvider>
  </StrictMode>,
)
