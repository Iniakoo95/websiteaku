import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import StudioBuilder from './StudioBuilder.jsx'
import './styles.css'

const mode = new URLSearchParams(window.location.search).get('mode')
const isBuilder = ['builder','studio','editor'].includes(mode)
createRoot(document.getElementById('root')).render(
  <React.StrictMode>{isBuilder ? <StudioBuilder /> : <App />}</React.StrictMode>
)
