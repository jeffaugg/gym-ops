import React, {useState} from "react";
import "./PhysicalAssessmentTable.css";
import { toast } from "react-toastify";
import api from "../../../api";
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";


export default function PhysicalAssessmentTable({
  physicalAssessments = [],
  onPhysicalAssessmentDeleted,
  setSelectedAssessment,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const handleDelete = async (id) => {
    try {
      await api.delete(`/reviews/${id}`);
      toast.success("Avaliação deletada com sucesso!");
      onPhysicalAssessmentDeleted();
      setSelectedAssessment(null); 
    } catch (error) {
      console.error("Erro ao deletar avaliação:", error);
      toast.error("Erro ao deletar avaliação.");
    }finally {
      setIsModalOpen(false);
    }
  };

const confirmDelete = (id) => {
  setSelectedId(id);
  setIsModalOpen(true);
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
                    onClick={() => confirmDelete(assessment.id)}
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
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          message={`Tem certeza que deseja deletar esta avaliação de "${physicalAssessments.find(assessment => assessment.id === selectedId)?.aluno_id?.name}" do dia ${new Date(physicalAssessments.find(assessment => assessment.id === selectedId)?.date).toLocaleString("pt-BR", { dateStyle: "short" })}"?`}
        />
      )}
    </div>
  );
}

