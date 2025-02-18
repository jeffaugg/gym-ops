import React, { useState } from "react";
import "./PhysicalAssessmentTable.css";
import { toast } from "react-toastify";
import api from "../../../api";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import FilterBar from "../../FilterBar/FilterBar"; 
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

export default function PhysicalAssessmentTable({
  physicalAssessments = [],
  onPhysicalAssessmentDeleted,
  onEditAssessment,
  filters,
  setFilters,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Avaliação deletada com sucesso!");
      onPhysicalAssessmentDeleted();
    } catch (error) {
      console.error("Erro ao deletar avaliação:", error);
      toast.error("Erro ao deletar avaliação.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const filteredAndSortedAssessments = physicalAssessments
    .filter((assessment) => {
      const matchesSearch =
        assessment.aluno_id?.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        assessment.aluno_id?.cpf.includes(filters.searchTerm) ||
        assessment.instructor_id?.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return filters.sortOrder === "asc"
          ? a.aluno_id?.name.localeCompare(b.aluno_id?.name)
          : b.aluno_id?.name.localeCompare(a.aluno_id?.name);
      } else if (filters.sortBy === "date") {
        return filters.sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (filters.sortBy === "instructor") {
        return filters.sortOrder === "asc"
          ? a.instructor_id?.name.localeCompare(b.instructor_id?.name)
          : b.instructor_id?.name.localeCompare(a.instructor_id?.name);
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="physical-assessment-list">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome, CPF ou instrutor"
        filterOptions={[{ value: "all", label: "Todos" }]}
        sortOptions={[
          { value: "name", label: "Nome do Aluno" },
          { value: "date", label: "Data da Avaliação" },
          { value: "instructor", label: "Instrutor Responsável" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>CPF</th>
            <th>Data da Avaliação</th>
            <th>Instrutor Responsável</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedAssessments.length > 0 ? (
            filteredAndSortedAssessments.map((assessment) => (
              <tr key={assessment.id}>
                <td>{assessment.aluno_id?.name || "N/A"}</td>
                <td>{assessment.aluno_id?.cpf || "N/A"}</td>
                <td>
                  {assessment.date
                    ? new Date(assessment.date).toLocaleDateString("pt-BR")
                    : "N/A"}
                </td>
                <td>{assessment.instructor_id?.name || "N/A"}</td>
                <td className="actions">
                  <button
                    className="btn edit"
                    onClick={() => onEditAssessment(assessment)}
                  >
                    <FaPenToSquare />
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => confirmDelete(assessment.id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhuma avaliação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          message={`Tem certeza que deseja deletar esta avaliação de "${
            physicalAssessments.find((assessment) => assessment.id === selectedId)
              ?.aluno_id?.name
          }" do dia ${new Date(
            physicalAssessments.find((assessment) => assessment.id === selectedId)
              ?.date
          ).toLocaleString("pt-BR", { dateStyle: "short" })}?`}
        />
      )}
    </div>
  );
}
