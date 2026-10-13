import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import VisualEditor from './VisualEditor.jsx'
import './styles.css'

const mode = new URLSearchParams(window.location.search).get('mode')
createRoot(document.getElementById('root')).render(<React.StrictMode>{mode==='editor' ? <VisualEditor/> : <App/>}</React.StrictMode>)
