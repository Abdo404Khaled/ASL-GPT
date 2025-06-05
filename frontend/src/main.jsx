import './index.css'
import { StrictMode } from 'react'
import Home from './pages/Home.jsx'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Home/>
    </QueryClientProvider>
  </StrictMode>,
)
