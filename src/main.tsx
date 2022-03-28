import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { IconContext } from "react-icons";
import './index.css'
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR'
ReactDOM.render(
  <React.StrictMode>
    <IconContext.Provider value={{ color: "white", className: "global-class-name" }}>
      <ConfigProvider locale={ptBR}>
        <App />
      </ConfigProvider>
    </IconContext.Provider>

  </React.StrictMode>,
  document.getElementById('root')
)
