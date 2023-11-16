import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from 'wouter';
import { App } from './App.jsx';
import { ActiveTabProductProvider } from './context/activeTabProduct';
import { CollectionsProvider } from './context/collections';
import { ProductsProvider } from './context/products';
import { SessionProvider } from './context/session';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <SessionProvider>
        <ActiveTabProductProvider>
          <CollectionsProvider>
            <ProductsProvider>
              <App />
            </ProductsProvider>
          </CollectionsProvider>
        </ActiveTabProductProvider>
      </SessionProvider>
    </Router>
  </StrictMode>
);
