import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import HomePage from './pages/home'
import Providers from './components/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Providers>
      <HomePage />
    </Providers>
  </StrictMode>,
)
