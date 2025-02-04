import React, { useState, useEffect } from "react";
import "./WorkoutForm.css";
import InputFieldForm from "../InputFieldForm/InputFieldForm";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import ButtonSend from "../ButtonSend/ButtonSend";
import { toast } from "react-toastify";
import api from "../../api";
import AssociateExerciseForm from "../AssociateExerciseForm/AssociateExerciseForm"; 

export default function WorkoutForm({ onWorkoutCreated, selectedWorkout, setSelectedWorkout, onCloseModal }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [treinoId, setTreinoId] = useState(null);

  const handleCancel = () => {
    setName("");
    setNotes("");
    setTreinoId(null);
    toast.info("Criação de treino cancelada.");
    onCloseModal(); // Fecha o modal ao cancelar
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
        const response = await api.put(`/workouts/${selectedWorkout.id}`, workoutData);
        toast.success("Treino atualizado com sucesso!");
        setTreinoId(selectedWorkout.id);
      } else {
        const response = await api.post("/workouts", workoutData);
        toast.success("Treino criado com sucesso!");
        setTreinoId(response.data.id); // Armazena o ID do treino recém-criado
      }

      onWorkoutCreated();
    } catch (error) {
      console.error("Erro ao salvar o treino:", error);
      toast.error("Erro ao salvar o treino.");
    }
  };

  return (
    <div>
      {!treinoId ? (
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
            <ButtonSend shouldContinue={true} />
            <ButtonCancel onClick={handleCancel} />
          </div>
        </form>
      ) : (
        <AssociateExerciseForm
          treinoId={treinoId}
          onExerciseAdded={onWorkoutCreated}
          onFinish={() => {
            setTreinoId(null);   // Reseta o estado do treinoId
            onCloseModal();      // Fecha o modal após finalizar a associação
          }}
        />
      )}
    </div>
  );
}
