import React from "react";
import "./WarningForm.css";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";

export default function WarningForm() {
  return (
    <div className="mensagem-form">
      <InputFieldForm label="Título*" type="text" placeholder={"Digite o título"}/>
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
        <ButtonSend />
        <ButtonCancel />
      </div>
    </div>
  );
}