import React, { useState, useEffect } from "react";
import "./WorkoutEditForm.css";
import InputFieldForm from "../InputFieldForm/InputFieldForm";
import ButtonSend from "../ButtonSend/ButtonSend";
import api from "../../api";
import { toast } from "react-toastify";

export default function WorkoutEditForm({ onWorkoutUpdated, selectedWorkout, setSelectedWorkout, onCloseModal }) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [exerciseAssociations, setExerciseAssociations] = useState([]);
  const [exercises, setExercises] = useState([]);

  // Carrega os dados gerais do treino e os exercícios associados
  useEffect(() => {
    if (selectedWorkout) {
      setName(selectedWorkout.name || "");
      setNotes(selectedWorkout.notes || "");

      const fetchAssociations = async () => {
        try {
          const response = await api.get(`/exercises-workouts/workouts/${selectedWorkout.id}`);
          setExerciseAssociations(response.data);
        } catch (error) {
          console.error("Erro ao buscar os exercícios do treino:", error);
          toast.error("Erro ao buscar os exercícios do treino.");
        }
      };

      fetchAssociations();
    }
  }, [selectedWorkout]);

  // Carrega todos os exercícios disponíveis para o dropdown
  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get("/exercises");
        setExercises(response.data);
      } catch (error) {
        console.error("Erro ao buscar os exercícios:", error);
        toast.error("Erro ao buscar os exercícios.");
      }
    };

    fetchExercises();
  }, []);

  const handleAssociationChange = (index, field, value) => {
    const updatedAssociations = [...exerciseAssociations];
    updatedAssociations[index] = { ...updatedAssociations[index], [field]: value };
    setExerciseAssociations(updatedAssociations);
  };

  const handleAddAssociation = () => {
    setExerciseAssociations([
      ...exerciseAssociations,
      { exercicio_id: "", series: "", repeticoes: "", descanso_segundos: "" }
    ]);
  };

  // Remove associação (se existir no banco, faz DELETE)
  const handleRemoveAssociation = async (index) => {
    const associationToRemove = exerciseAssociations[index];

    if (associationToRemove.id) {
      try {
        await api.delete(`/exercises-workouts/${associationToRemove.id}`);
        toast.success("Exercício removido com sucesso!");
      } catch (error) {
        console.error("Erro ao remover exercício:", error);
        toast.error("Erro ao remover exercício.");
        return;
      }
    }

    const updatedAssociations = [...exerciseAssociations];
    updatedAssociations.splice(index, 1);
    setExerciseAssociations(updatedAssociations);
  };

  const handleCancel = () => {
    toast.info("Edição cancelada.");
    setSelectedWorkout(null);
    if (onCloseModal) onCloseModal();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Atualiza os dados gerais do treino
    try {
      await api.put(`/workouts/${selectedWorkout.id}`, { name, notes });
      toast.success("Dados do treino atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar os dados do treino:", error);
      toast.error("Erro ao atualizar os dados do treino.");
      return;
    }

    // Atualiza/cria as associações de exercícios
    try {
      for (const assoc of exerciseAssociations) {
        if (assoc.exercicio_id) {
          // Se já existir no banco, faz PUT, caso contrário, POST
          if (assoc.id) {
            await api.put(`/exercises-workouts/${assoc.id}`, {
              treino_id: selectedWorkout.id,
              exercicio_id: parseInt(assoc.exercicio_id),
              series: parseInt(assoc.series),
              repeticoes: parseInt(assoc.repeticoes),
              descanso_segundos: parseInt(assoc.descanso_segundos),
            });
          } else {
            await api.post("/exercises-workouts", {
              treino_id: selectedWorkout.id,
              exercicio_id: parseInt(assoc.exercicio_id),
              series: parseInt(assoc.series),
              repeticoes: parseInt(assoc.repeticoes),
              descanso_segundos: parseInt(assoc.descanso_segundos),
            });
          }
        }
      }
      toast.success("Exercícios associados atualizados com sucesso!");
      onWorkoutUpdated();
      setSelectedWorkout(null);
      if (onCloseModal) onCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar os exercícios associados:", error);
      toast.error("Erro ao atualizar os exercícios associados.");
    }
  };

  return (
    <div className="workout-edit-form">
      <form onSubmit={handleSubmit}>
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

        <h3>Exercícios Associados</h3>
        {exerciseAssociations.map((assoc, index) => (
          <div key={index} className="form-group exercise-association">
            <label>
              Exercício*
              <select
                required
                value={assoc.exercicio_id}
                onChange={(e) => handleAssociationChange(index, "exercicio_id", e.target.value)}
              >
                <option value="">Selecione um exercício</option>
                {exercises.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </label>
            <InputFieldForm
              label="Séries*"
              type="number"
              placeholder="Digite o número de séries"
              required
              value={assoc.series}
              onChange={(e) => handleAssociationChange(index, "series", e.target.value)}
            />
            <InputFieldForm
              label="Repetições*"
              type="number"
              placeholder="Digite o número de repetições"
              required
              value={assoc.repeticoes}
              onChange={(e) => handleAssociationChange(index, "repeticoes", e.target.value)}
            />
            <InputFieldForm
              label="Descanso (s)*"
              type="number"
              placeholder="Tempo de descanso em segundos"
              required
              value={assoc.descanso_segundos}
              onChange={(e) => handleAssociationChange(index, "descanso_segundos", e.target.value)}
            />
            {exerciseAssociations.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveAssociation(index)}
                className="btn remove-association"
              >
                Remover
              </button>
            )}
          </div>
        ))}

        {/* Botão para adicionar novos exercícios */}
        <div className="form-actions">
          <button
            type="button"
            onClick={handleAddAssociation}
            className="btn add-association"
          >
            Adicionar Exercício
          </button>
        </div>

        {/* Botões finais (Cancelar / Atualizar) */}
        <div className="form-actions">
          {/* Botão Cancelar substitui o "Limpar campos" e fecha o modal */}
          <button
            type="button"
            onClick={handleCancel}
            className="btn cancel-button"
          >
            Cancelar
          </button>

          <ButtonSend isEditing={true} />
        </div>
      </form>
    </div>
  );
}
