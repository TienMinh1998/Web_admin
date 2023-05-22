import './App.css';
import 'antd/dist/reset.css';
import 'react-loading-skeleton/dist/skeleton.css';
import { AppRoutes } from 'routes';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <React.StrictMode>
      <HelmetProvider>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer limit={5} />
        </BrowserRouter>
      </HelmetProvider>
    </React.StrictMode>
  );
}

export default App;
