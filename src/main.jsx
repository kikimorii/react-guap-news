import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import './layout/scss/main.scss';
import './layout/js/desktopMenu.js';
import './layout/js/mobileMenu.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
