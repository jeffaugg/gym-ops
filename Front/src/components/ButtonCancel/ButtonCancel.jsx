import React from "react";

import "./ButtonCancel.css";

export default function ButtonCancel({ onClick }) {
  return (
      <button type="button" onClick={onClick} className="btn cancelar">
        Cancelar
      </button>
  );
}