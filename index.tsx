import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import './i18n';

const rootElement = document.getElementById('root')!;

if (rootElement.hasChildNodes()) {
  // SSG/Production: Hydrate existing HTML
  hydrateRoot(rootElement, (
    <StrictMode>
      <App />
    </StrictMode>
  ));
} else {
  // Dev/CSR: Render from scratch
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
