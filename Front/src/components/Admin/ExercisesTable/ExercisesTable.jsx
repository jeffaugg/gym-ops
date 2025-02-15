import React, { useState } from "react";
import "./ExercisesTable.css";
import { FaPenToSquare } from "react-icons/fa6";
import api from "../../../api";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

export default function ExercisesTable({ exercises, onExerciseDeleted, setSelectedExercise, selectedExercise }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
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
                <td className="actions">
                  <button className="btn edit" onClick={() => setSelectedExercise(exercise)}>
                    <FaPenToSquare />
                  </button>
                  <button className="btn delete" onClick={() => confirmDelete(exercise.id)}>
                    <MdOutlineDelete />
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
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          message={`Tem certeza que deseja deletar este exercício "${exercises.find(ex => ex.id === selectedId)?.name}"?`}
        />
      )}
    </div>
  );
}