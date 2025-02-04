import React from "react";
import "./ButtonSend.css";

export default function ButtonSend({ onClick, isEditing, shouldContinue }) {
    return (
        <button type="submit" onClick={onClick} className="btn enviar">
            {shouldContinue ? "Continuar" : isEditing ? "Atualizar" : "Cadastrar"}
        </button>
    );
}
