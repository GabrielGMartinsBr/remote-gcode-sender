import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'react-toastify/dist/ReactToastify.css';

import './index.css'
import './main.scss'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
