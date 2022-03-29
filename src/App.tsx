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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />
        
        <Route path="/images" element={<ImagesHome />} />
        
        <Route path="/planos" element={<Planos />} />
        
        <Route path="/perguntas" element={<Perguntas />} />
        
        <Route path="/depoimentos" element={<Depoimentos />} />
        
        <Route path="/clientes" element={<Clientes />} />
        
        <Route path="/notificacoes" element={<Notificacoes />} />
        
        <Route path="/motos" element={<Motos />} />
        
        <Route path="/pagamentos" element={<Pagamentos />} />

        <Route path="/manutencao" element={<Manutencao />} />
      
      </Routes>
    </BrowserRouter>

  );
}