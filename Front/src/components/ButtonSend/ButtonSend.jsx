import React from "react";
import "./ButtonSend.css";

export default function ButtonSend({ onClick, isEditing }) {
    return (
        <button type="submit" onClick={onClick} className="btn enviar">
            {isEditing ? "Atualizar" : "Enviar"}
        </button>
    );
}
