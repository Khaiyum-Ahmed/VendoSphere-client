import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from './routes/router.jsx';
import { RouterProvider } from "react-router/dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from './context/AuthProvider.jsx';
import { CartProvider } from './context/CartContext.jsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
