import React, { useState, useEffect } from "react";
import "./PlansForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import { toast } from "react-toastify";
import api from "../../../api";

export default function PlansForm({ onPlanCreated, selectedPlan, setSelectedPlan }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [spots, setSpots] = useState("");

  const handleCancel = () => {
    setName("");
    setPrice("");
    setDuration("ALL");
    setSpots("");
    toast.info("Plano cancelado.");
    };

  useEffect(() => {
    if (selectedPlan) {
      setName(selectedPlan.name || "");
      setPrice(selectedPlan.price || "");
      setDuration(selectedPlan.duration || "");
      setSpots(selectedPlan.spots || "");
    } else {
      setName("");
      setPrice("");
      setDuration("");
      setSpots("");
    }
  }, [selectedPlan]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedPlan) {

        console.log(selectedPlan);
        await api.put(`/plan/${selectedPlan.id}`, {
          name,
          price: Number(price),
          duration: Number(duration),
          spots: Number(spots),
        }
        );
        toast.success("Plano atualizado com sucesso!");
      } else {
        await api.post("/plan", {
          name,
          price: Number(price),
          duration: Number(duration),
          spots: Number(spots),
        });
        toast.success("Plano criado com sucesso!");
      }

      setName("");
      setPrice("");
      setDuration("");
      setSpots("");

      setSelectedPlan(null);

      onPlanCreated();
    } catch (error) {
      console.error("Erro ao salvar o plano:", error);
      toast.error("Erro ao salvar o plano.");
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
        <ButtonSend isEditing={!!selectedPlan} />          
        <ButtonCancel onClick={handleCancel} />
      </div>
    </form>
  );
}
