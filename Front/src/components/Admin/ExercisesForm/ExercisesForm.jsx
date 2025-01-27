import React, { useState, useEffect } from "react";
import "./ExercisesForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import { toast } from "react-toastify";
import api from "../../../api";

export default function ExercisesForm({ onExerciseCreated, selectedExercise, setSelectedExercise }) {
  const [name, setName] = useState("");
  const [muscles, setMuscles] = useState("");

  const handleCancel = () => {
    setName("");
    setMuscles("");
    toast.info("Operação cancelada.");
  };

  useEffect(() => {
    if (selectedExercise) {
      setName(selectedExercise.name || "");
      setMuscles(selectedExercise.muscles || "");
    } else {
      setName("");
      setMuscles("");
    }
  }, [selectedExercise]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedExercise) {
        await api.put(`/exercises/${selectedExercise.id}`, {
          name,
          muscles,
        });
        toast.success("Exercício atualizado com sucesso!");
      } else {
        await api.post("/exercises", {
          name,
          muscles,
        });
        toast.success("Exercício criado com sucesso!");
      }

      setName("");
      setMuscles("");
      setSelectedExercise(null);

      onExerciseCreated();
    } catch (error) {
      console.error("Erro ao salvar o exercício:", error);
      toast.error("Erro ao salvar o exercício.");
    }
  };

  return (
    <form className="exercises-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <InputFieldForm
          label="Nome do exercício*"
          type="text"
          placeholder="Digite o nome do exercício"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputFieldForm
          label="Músculo trabalhado*"
          type="text"
          placeholder="Digite o músculo trabalhado"
          value={muscles}
          onChange={(e) => setMuscles(e.target.value)}
        />
      </div>
      <div className="form-actions">
        <ButtonSend isEditing={!!selectedExercise} />          
        <ButtonCancel onClick={handleCancel} />
      </div>
    </form>
  );
}
