
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./hooks/auth";

const Autenticado = () => {
    const response = localStorage.getItem('@Motok:user')
    const user = JSON.parse(response ? response : ''); 
  return user && user.id;
};

const ProtectedRoutes = () => {
  const isAuth = Autenticado();
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;