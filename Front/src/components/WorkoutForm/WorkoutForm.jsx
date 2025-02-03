import React, { useState, useEffect } from "react";
import "./WorkoutForm.css";
import InputFieldForm from "../InputFieldForm/InputFieldForm";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import ButtonSend from "../ButtonSend/ButtonSend";
import { toast } from "react-toastify";
import api from "../../api";

export default function WorkoutForm({ onWorkoutCreated, selectedWorkout, setSelectedWorkout }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  const handleCancel = () => {
    setName("");
    setNotes("");
    toast.info("Criação de treino cancelada.");
  };

  useEffect(() => {
    if (selectedWorkout) {
      setName(selectedWorkout.name || "");
      setNotes(selectedWorkout.notes || "");
    }
  }, [selectedWorkout]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const workoutData = { name, notes };

      if (selectedWorkout) {
        await api.put(`/workouts/${selectedWorkout.id}`, workoutData);
        toast.success("Treino atualizado com sucesso!");
      } else {
        await api.post("/workouts", workoutData);
        toast.success("Treino criado com sucesso!");
      }

      setName("");
      setNotes("");
      setSelectedWorkout(null);
      onWorkoutCreated();
    } catch (error) {
      console.error("Erro ao salvar o treino:", error);
      toast.error("Erro ao salvar o treino.");
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <InputFieldForm
          label="Nome do Treino*"
          type="text"
          placeholder="Digite o nome do treino"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputFieldForm
          label="Notas"
          type="text"
          placeholder="Adicione anotações sobre o treino"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <ButtonSend isEditing={!!selectedWorkout} />
        <ButtonCancel onClick={handleCancel} />
      </div>
    </form>
  );
}
