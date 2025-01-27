import React from "react";
import "./ExercisesTable.css";
import api from "../../../api";
import { toast } from "react-toastify";

export default function ExercisesTable({ exercises, onExerciseDeleted, setSelectedExercise, selectedExercise }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/exercises/${id}`);
      if (selectedExercise && selectedExercise.id === id) {
        setSelectedExercise(null);
      }
      toast.success("Exercício deletado com sucesso!");
      onExerciseDeleted();
    } catch (error) {
      console.error("Erro ao deletar o exercício:", error);
      toast.error("Erro ao deletar o exercício.");
    }
  };

  return (
    <div className="exercises-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Músculo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {exercises.length > 0 ? (
            exercises.map((exercise) => (
              <tr key={exercise.id}>
                <td>{exercise.name}</td>
                <td>{exercise.muscles}</td>
                <td>
                  <button className="btn edit" onClick={() => setSelectedExercise(exercise)}>
                    ✏️
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(exercise.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum exercício encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
