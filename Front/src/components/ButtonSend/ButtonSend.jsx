import React from "react";
import "./ButtonSend.css";

export default function ButtonSend({ onClick }) {
    return (
            <button type="submit" onClick={onClick} className="btn enviar">
                Enviar
            </button>
    );
}