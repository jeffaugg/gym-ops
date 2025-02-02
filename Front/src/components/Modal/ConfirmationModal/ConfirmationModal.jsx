import React from "react";
import "./ConfirmationModal.css";

export default function ConfirmationModal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirmação</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Cancelar</button>
          <button className="btn-confirm" onClick={onConfirm}>Confirmar</button>
        </div>
      </div>
    </div>
  );
}
