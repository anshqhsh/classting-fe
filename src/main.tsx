import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/styles/global.scss';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import ToastProvider from './components/Providers/ToastProvider';
import Layout from './components/Layout/layout';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Layout>
        <App />
      </Layout>
      <ToastProvider />
    </BrowserRouter>
  </React.StrictMode>
);
