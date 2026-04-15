import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom';
import { router } from './core/router/router.tsx';
import './index.css'
import { AccountProvider } from './core/contexts/AccountContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AccountProvider>
      <RouterProvider router={router} />
    </AccountProvider>
  </StrictMode>
)