import React from "react";
import "./WarningForm.css";

export default function WarningForm() {
    return (
        <div className="mensagem-form">
             <label>
              Título*
              <input type="text" placeholder="Digite o título" required />
            </label>
            <label>
              Mensagem*
              <textarea placeholder="Digite sua mensagem" required></textarea>
            </label>
            <label>
              Enviar para
              <select>
                <option value="todos">Todos</option>
                <option value="instrutores">Somente Instrutores</option>
              </select>
            </label>
            <div className="form-actions">
              <button type="submit" className="btn enviar">Enviar</button>
              <button type="button" className="btn cancelar">Cancelar</button>
            </div>
        </div>
    );
}