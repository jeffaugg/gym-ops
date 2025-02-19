import React, { useEffect, useState } from "react";
import "./PhysicalAssessment.css";
import Layout from "../../../components/Instructor/LayoutPages/Layout";
import PhysicalAssessmentForm from "../../../components/Instructor/PhysicalAssessmentForm/PhysicalAssessmentForm";
import PhysicalAssessmentTable from "../../../components/Instructor/PhysicalAssessmentTable/PhysicalAssessmentTable";
import Modal from "../../../components/Modal/Modal";
import api from "../../../api";
import { toast } from "react-toastify";

function PhysicalAssessment() {
  const [physicalAssessments, setPhysicalAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "all", 
    sortBy: "name", 
    sortOrder: "asc",
    itemsPerPage: 5, 
  });

  const fetchPhysicalAssessments = async () => {
    try {
      const response = await api.get("/reviews", {
        params: {
          search: filters.searchTerm,
          filterBy: filters.filterBy !== "all" ? filters.filterBy : undefined,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          limit: filters.itemsPerPage,
        },
      });
      setPhysicalAssessments(response.data);
    } catch (error) {
      console.error("Erro ao buscar as avaliações físicas:", error);
      toast.error("Erro ao buscar as avaliações físicas.");
    }
  };

  useEffect(() => {
    fetchPhysicalAssessments();
  }, [filters]); 

  const handleOpenModal = () => {
    setSelectedAssessment(null);
    setIsModalOpen(true);
  };

  const handleEditAssessment = (assessment) => {
    setSelectedAssessment(assessment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAssessment(null);
  };

  return (
    <Layout>
      <div className="assessments-content">
        <header className="assessments-header">
          <h1>Avaliações Físicas</h1>
          <button onClick={handleOpenModal} className="btn add-assessment">
            Adicionar Avaliação
          </button>
        </header>

        <PhysicalAssessmentTable
          physicalAssessments={physicalAssessments}
          onPhysicalAssessmentDeleted={fetchPhysicalAssessments}
          onEditAssessment={handleEditAssessment}
          filters={filters}
          setFilters={setFilters}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <PhysicalAssessmentForm
            onPhysicalAssessmentCreated={() => {
              fetchPhysicalAssessments();
              handleCloseModal();
            }}
            selectedAssessment={selectedAssessment}
            setSelectedAssessment={setSelectedAssessment}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default PhysicalAssessment;
