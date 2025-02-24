import React, { useState } from "react";
import "./ExercisesTable.css";
import { FaPenToSquare } from "react-icons/fa6";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import FilterBar from "../../FilterBar/FilterBar"; 
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

export default function ExercisesTable({
  exercises,
  onExerciseDeleted,
  setSelectedExercise,
  selectedExercise,
  filters,
  setFilters,
}) {
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

  const filteredAndSortedExercises = exercises
    .filter((exercise) => {
      const matchesSearch =
        exercise.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        exercise.muscles.toLowerCase().includes(filters.searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return filters.sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (filters.sortBy === "muscles") {
        return filters.sortOrder === "asc"
          ? a.muscles.localeCompare(b.muscles)
          : b.muscles.localeCompare(a.muscles);
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="exercises-list">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome ou músculos"
        filterOptions={[{ value: "all", label: "Todos" }]}
        sortOptions={[
          { value: "name", label: "Nome" },
          { value: "muscles", label: "Músculo" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Músculo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedExercises.length > 0 ? (
            filteredAndSortedExercises.map((exercise) => (
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

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDelete(selectedId)}
        message={`Tem certeza que deseja deletar este exercício "${exercises.find(ex => ex.id === selectedId)?.name}"?`}
      />
    </div>
  );
}
