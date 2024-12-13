import React from "react";
import { useNavigate } from "react-router-dom";
import "./Button.css";

export default function Button({ type, onClick, children, navigateTo }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (navigateTo) {
      navigate(navigateTo); // Redireciona para a página especificada
    } else if (onClick) {
      onClick(); // Executa a função onClick, se fornecida
    }
  };

  return (
    <button type={type} onClick={handleClick} className="button">
      {children}
    </button>
  );
}
