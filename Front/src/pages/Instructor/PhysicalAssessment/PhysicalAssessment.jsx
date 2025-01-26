import React, { useEffect, useState } from "react";
import "./PhysicalAssessment.css";
import Layout from "../../../components/Instructor/LayoutPages/Layout";
import PhysicalAssessmentForm from "../../../components/Instructor/PhysicalAssessmentForm/PhysicalAssessmentForm";
import PhysicalAssessmentTable from "../../../components/Instructor/PhysicalAssessmentTable/PhysicalAssessmentTable";
import api from "../../../api";
import { toast } from "react-toastify";

function PhysicalAssessment() {
  const [physicalAssessments, setPhysicalAssessments] = useState([]);
  // NOVO: Estado para guardar a avaliação selecionada (para edição)
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const fetchPhysicalAssessments = async () => {
    try {
      const response = await api.get("/reviews");
      // Ordena as avaliações pelo ID (decrescente)
      const sortedAssessments = response.data.sort((a, b) => b.id - a.id);
      setPhysicalAssessments(sortedAssessments);
    } catch (error) {
      console.error("Erro ao buscar as avaliações físicas:", error);
      toast.error("Erro ao buscar as avaliações físicas.");
    }
  };

  useEffect(() => {
    fetchPhysicalAssessments();
  }, []);

  return (
    <Layout>
      <div className="assessments-content">
        <header className="assessments-header">
          <h1>Avaliações Físicas</h1>
        </header>

        {/* Formulário para cadastrar ou editar avaliação */}
        <PhysicalAssessmentForm
          onPhysicalAssessmentCreated={fetchPhysicalAssessments}
          selectedAssessment={selectedAssessment}            // Passa avaliação selecionada
          setSelectedAssessment={setSelectedAssessment}       // Função que permite limpar ou setar nova avaliação
        />

        {/* Tabela que lista as avaliações */}
        <PhysicalAssessmentTable
          physicalAssessments={physicalAssessments}
          onPhysicalAssessmentDeleted={fetchPhysicalAssessments}
          setSelectedAssessment={setSelectedAssessment}       // Botão de editar vai usar isso
        />
      </div>
    </Layout>
  );
}

export default PhysicalAssessment;
