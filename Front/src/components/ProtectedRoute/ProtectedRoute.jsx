import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  // Verifica se o token existe no localStorage ou sessionStorage
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");

  // Se o token não existir, redireciona para a página de login
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // Se o token existir, renderiza o conteúdo protegido
  return children;
}

export default ProtectedRoute;
