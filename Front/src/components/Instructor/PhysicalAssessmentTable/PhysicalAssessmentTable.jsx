import React from "react";
import "./PhysicalAssessmentTable.css";
import { toast } from "react-toastify";
import api from "../../../api";

export default function PhysicalAssessmentTable({
  physicalAssessments = [],
  onPhysicalAssessmentDeleted,
  setSelectedAssessment,
}) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Avaliação deletada com sucesso!");
      onPhysicalAssessmentDeleted();
      setSelectedAssessment(null); 
    } catch (error) {
      console.error("Erro ao deletar avaliação:", error);
      toast.error("Erro ao deletar avaliação.");
    }
  };

  return (
    <div className="physical-assessment-list">
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
          {physicalAssessments.length > 0 ? (
            physicalAssessments.map((assessment) => (
              <tr key={assessment.id}>
                <td>{assessment.aluno_id?.name || "N/A"}</td>
                <td>{assessment.aluno_id?.cpf || "N/A"}</td>
                <td>
                  {assessment.date
                    ? new Date(assessment.date).toLocaleDateString("pt-BR")
                    : "N/A"}
                </td>
                <td>{assessment.instructor_id?.name || "N/A"}</td>
                <td>
                  <button
                    className="btn edit"
                    onClick={() => setSelectedAssessment(assessment)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(assessment.id)}
                  >
                    ❌
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
    </div>
  );
}

