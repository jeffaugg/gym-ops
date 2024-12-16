import React, { useState } from "react";
import "./WarningForm.css";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import api from "../../../api"
import { toast } from "react-toastify";

export default function WarningForm({ onWarningCreated}) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sendTo, setSendTo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/message", {
        title,
        body: message,
        recipient_type: sendTo,
      });

      toast.success("Mensagem enviada com sucesso!");

      // Limpa o formulário
      setTitle("");
      setMessage("");
      setSendTo("");

      onWarningCreated();
    } catch (error) {
      console.error("Erro ao enviar a mensagem:", error);
      toast.error("Erro ao enviar a mensagem.");
    }
  }
  return (
    <div className="warnings-form">
      <form onSubmit={handleSubmit}>
        <InputFieldForm
          label="Título*"
          type="text"
          placeholder="Digite o título da mensagem"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>
          Mensagem*
          <textarea placeholder="Digite sua mensagem" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
        </label>
        <label>
          Enviar para
          <select value={sendTo} onChange={(e) => setSendTo(e.target.value)}>
            <option value="ALL">Todos</option>
            <option value="INSTRUCTORS">Somente Instrutores</option>
            <option value="STUDENTS">Somente Alunos</option>
          </select>
        </label>
        <div className="form-actions">
          <ButtonSend />
          <ButtonCancel />
        </div>
      </form>
    </div>
  );
}