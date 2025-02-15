import React, { useState } from "react";
import "./WorkoutTable.css";
import api from "../../api";
import { toast } from "react-toastify";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmationModal from "../Modal/ConfirmationModal/ConfirmationModal";

export default function WorkoutTable({ workouts, onWorkoutDeleted, setSelectedWorkout, selectedWorkout }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
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
                <td className="actions">
                  <button className="btn edit" onClick={() => setSelectedWorkout(workout)}>
                    <FaPenToSquare />
                  </button>
                  <button className="btn delete" onClick={() => confirmDelete(workout.id)}>
                    <MdOutlineDelete />
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
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          message={`Tem certeza que deseja deletar o treino "${workouts.find(workout => workout.id === selectedId)?.name}"?`}
        />
      )}
    </div>
  );
}