import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ContextProvider from './components/context/Context.tsx'
document.documentElement.classList.add('dark'); 

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ContextProvider>
    <App />
    </ContextProvider>
);
