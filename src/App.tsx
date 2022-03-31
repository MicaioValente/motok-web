import * as React from "react";
import {   BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ImagesHome from './pages/ImagesHome';
import Planos from "./pages/Planos";
import Perguntas from "./pages/Perguntas";
import Depoimentos from './pages/Depoimentos';
import Clientes from "./pages/Clientes";
import Notificacoes from "./pages/Notificacoes";
import Motos from "./pages/Motos";
import Pagamentos from "./pages/Boletos";
import Manutencao from "./pages/Manutencao";
import { useAuth } from "./hooks/auth";
import ProtectedRoutes from "./ProtectedRoutes";

export default function App() {
  const { signIn, user } = useAuth();
  console.log({signIn}, {user})

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route element={<ProtectedRoutes />} >
          <Route path="/" element={<Home />} />
          
          <Route path="/images" element={<ImagesHome />} />
          
          <Route path="/planos" element={<Planos />} />
          
          <Route path="/perguntas" element={<Perguntas />} />
          
          <Route path="/depoimentos" element={<Depoimentos />} />
          
          <Route path="/clientes" element={<Clientes />} />
          
          <Route path="/notificacoes" element={<Notificacoes />} />
          
          <Route path="/motos" element={<Motos />} />
          
          <Route path="/pagamentos" element={<Pagamentos />} />

          <Route path="/manutencao" element={<Manutencao />} />
        
        </Route>
      
      </Routes>
    </BrowserRouter>

  );
}