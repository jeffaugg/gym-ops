import React, { useState, useEffect } from "react";
import "./AssociateExerciseForm.css";
import InputFieldForm from "../InputFieldForm/InputFieldForm";
import ButtonSend from "../ButtonSend/ButtonSend";
import { toast } from "react-toastify";
import api from "../../api";

export default function AssociateExerciseForm({ treinoId, onExerciseAdded, onFinish }) {
  const [exercises, setExercises] = useState([]);
  const [exerciseData, setExerciseData] = useState([
    { exercicio_id: "", series: "", repeticoes: "", descanso_segundos: "" }
  ]);
  const [addedExerciseIds, setAddedExerciseIds] = useState([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await api.get("/exercises");
        setExercises(response.data);
      } catch (error) {
        console.error("Erro ao buscar exercícios:", error);
        toast.error("Erro ao buscar exercícios.");
      }
    };

    fetchExercises();
  }, []);

  const handleChange = (index, field, value) => {
    const updatedData = [...exerciseData];
    updatedData[index][field] = value;
    setExerciseData(updatedData);
  };

  const handleAddExercise = async () => {
    const lastExercise = exerciseData[exerciseData.length - 1];

    if (
      !lastExercise.exercicio_id ||
      !lastExercise.series ||
      !lastExercise.repeticoes ||
      !lastExercise.descanso_segundos
    ) {
      toast.error("Preencha todos os campos antes de adicionar outro exercício.");
      return;
    }

    const exerciseId = parseInt(lastExercise.exercicio_id);
    if (addedExerciseIds.includes(exerciseId)) {
      toast.error("O exercício já foi associado");
      return;
    }

    try {
      await api.post("/exercises-workouts", {
        treino_id: treinoId,
        exercicio_id: exerciseId,
        series: parseInt(lastExercise.series),
        repeticoes: parseInt(lastExercise.repeticoes),
        descanso_segundos: parseInt(lastExercise.descanso_segundos)
      });

      toast.success("Exercício adicionado com sucesso!");

      setAddedExerciseIds([...addedExerciseIds, exerciseId]);
      // Limpa os campos sem adicionar novos inputs
      setExerciseData([{ exercicio_id: "", series: "", repeticoes: "", descanso_segundos: "" }]);
      onExerciseAdded();
    } catch (error) {
      console.error("Erro ao adicionar exercício:", error);
      toast.error("Erro ao adicionar exercício.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verifica duplicidade entre os exercícios já adicionados e os novos
    let newExerciseIds = new Set(addedExerciseIds);
    for (const data of exerciseData) {
      if (data.exercicio_id) {
        const exerciseId = parseInt(data.exercicio_id);
        if (newExerciseIds.has(exerciseId)) {
          toast.error("O exercício já foi associado");
          return;
        }
        newExerciseIds.add(exerciseId);
      }
    }

    try {
      for (const data of exerciseData) {
        if (data.exercicio_id) {
          await api.post("/exercises-workouts", {
            treino_id: treinoId,
            exercicio_id: parseInt(data.exercicio_id),
            series: parseInt(data.series),
            repeticoes: parseInt(data.repeticoes),
            descanso_segundos: parseInt(data.descanso_segundos)
          });
        }
      }
      toast.success("Todos os exercícios foram associados com sucesso!");
      onExerciseAdded();
      onFinish(); // Fecha o modal após o envio
    } catch (error) {
      console.error("Erro ao associar exercícios:", error);
      toast.error(error.response?.data?.message || "Erro ao associar exercícios.");
    }
  };

  // Novo comportamento: limpar os campos sem fechar o modal
  const handleClearFields = () => {
    setExerciseData([{ exercicio_id: "", series: "", repeticoes: "", descanso_segundos: "" }]);
    toast.info("Campos limpos.");
  };

  return (
    <form className="associate-exercise-form" onSubmit={handleSubmit}>
      {exerciseData.map((exercise, index) => (
        <div key={index} className="form-group">
          <label>
            Exercício*
            <select
              required
              value={exercise.exercicio_id}
              onChange={(e) => handleChange(index, "exercicio_id", e.target.value)}
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
            value={exercise.series}
            onChange={(e) => handleChange(index, "series", e.target.value)}
          />

          <InputFieldForm
            label="Repetições*"
            type="number"
            placeholder="Digite o número de repetições"
            required
            value={exercise.repeticoes}
            onChange={(e) => handleChange(index, "repeticoes", e.target.value)}
          />

          <InputFieldForm
            label="Descanso (s)*"
            type="number"
            placeholder="Tempo de descanso em segundos"
            required
            value={exercise.descanso_segundos}
            onChange={(e) => handleChange(index, "descanso_segundos", e.target.value)}
          />
        </div>
      ))}

      <div className="form-actions">
        <div className="left-actions">
          <button type="button" onClick={handleAddExercise} className="btn add-exercise">
            Adicionar mais um exercício
          </button>
        </div>
        <div className="right-actions">
          <button type="button" onClick={handleClearFields} className="btn clear-fields">
            Limpar campos
          </button>
          <ButtonSend />
        </div>
      </div>
    </form>
  );
}
