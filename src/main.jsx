import { createRoot } from 'react-dom/client'
import './main.css'
import Router from './router/Router'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Router />
  </BrowserRouter>
)
