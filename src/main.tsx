import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.scss';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ToastProvider from './components/Providers/ToastProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <ToastProvider />
    </BrowserRouter>
  </React.StrictMode>
);
