import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IconContext } from "react-icons";
import './index.css'
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR'
import AppProvider from './hooks';
import { ToastContainer } from 'react-toastify';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
        <ConfigProvider locale={ptBR}>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="colored"
            pauseOnHover
          />
        </ConfigProvider>
      </IconContext.Provider>
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
