import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { redirectLegacyPreview } from './lib/router'

// Tautan lama `/?preview=<slug>` diarahkan ke `/preview/<slug>` sebelum render.
redirectLegacyPreview()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
