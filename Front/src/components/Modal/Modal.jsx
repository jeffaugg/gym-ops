import React from "react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay-form" onClick={onClose}>
      <div className="modal-content-form" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-form" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
