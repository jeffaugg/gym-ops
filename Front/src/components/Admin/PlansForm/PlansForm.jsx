import React, { useState } from "react";
import "./PlansForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import { toast } from "react-toastify";
import api from "../../../api";

export default function PlansForm({ onPlanCreated }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [spots, setSpots] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/plan", {
        name,
        price: Number(price),
        duration: Number(duration),
        spots: Number(spots),
      });

      toast.success("Plano criado com sucesso!");

      // Limpa o formulário
      setName("");
      setPrice("");
      setDuration("");
      setSpots("");

      // Atualiza a tabela
      onPlanCreated();
    } catch (error) {
      console.error("Erro ao criar o plano:", error);
      toast.error("Erro ao criar o plano.");
    }
  };

  return (
    <form className="plans-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <InputFieldForm
          label="Nome do plano*"
          type="text"
          placeholder="Digite o nome do plano"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputFieldForm
          label="Valor*"
          type="number"
          placeholder="Digite o valor"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <div className="form-group">
        <InputFieldForm
          label="Duração em dias*"
          type="number"
          placeholder="Digite a duração em dias"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <InputFieldForm
          label="Quantidade de vagas*"
          type="number"
          placeholder="Digite a quantidade de vagas"
          value={spots}
          onChange={(e) => setSpots(e.target.value)}
        />

      </div>
      <div className="form-actions">
        <ButtonCancel />
        <button type="submit" className="btn enviar">
          Enviar
        </button>
      </div>
    </form>
  );
}
