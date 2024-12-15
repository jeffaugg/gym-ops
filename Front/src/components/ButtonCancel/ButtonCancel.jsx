import React from "react";

import "./ButtonCancel.css";

export default function ButtonCancel({ type, onClick }) {
  return (
      <button type={type} onClick={onClick} className="btn cancelar">
        Cancelar
      </button>
  );
}