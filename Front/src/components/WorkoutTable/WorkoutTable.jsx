import React, { useState } from "react";
import "./WorkoutTable.css";
import api from "../../api";
import { toast } from "react-toastify";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import FilterBar from "../FilterBar/FilterBar"; 
import ConfirmationModal from "../Modal/ConfirmationModal/ConfirmationModal";

export default function WorkoutTable({ workouts, onWorkoutDeleted, setSelectedWorkout, selectedWorkout, filters, setFilters }) {
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

  const filteredAndSortedWorkouts = workouts
    .filter((workout) => {
      const matchesSearch =
        workout.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        workout.notes.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return filters.sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (filters.sortBy === "notes") {
        return filters.sortOrder === "asc"
          ? a.notes.localeCompare(b.notes)
          : b.notes.localeCompare(a.notes);
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="workout-list">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome ou notas"
        filterOptions={[{ value: "all", label: "Todos" }]}
        sortOptions={[
          { value: "name", label: "Nome" },
          { value: "notes", label: "Notas" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Notas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedWorkouts.length > 0 ? (
            filteredAndSortedWorkouts.map((workout) => (
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
