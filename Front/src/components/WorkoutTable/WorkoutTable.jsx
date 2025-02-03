import React from "react";
import "./WorkoutTable.css";
import api from "../../api";
import { toast } from "react-toastify";

export default function WorkoutTable({ workouts, onWorkoutDeleted, setSelectedWorkout, selectedWorkout }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/workouts/${id}`);
      if (selectedWorkout && selectedWorkout.id === id) {
        setSelectedWorkout(null);
      }
      toast.success("Treino deletado com sucesso!");
      onWorkoutDeleted();
    } catch (error) {
      console.error("Erro ao deletar o treino:", error);
      toast.error("Erro ao deletar o treino.");
    }
  };

  return (
    <div className="workout-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Notas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <tr key={workout.id}>
                <td>{workout.name}</td>
                <td>{workout.notes}</td>
                <td>
                  <button className="btn edit" onClick={() => setSelectedWorkout(workout)}>
                    ✏️
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(workout.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhum treino encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
