import React, { useEffect, useState } from "react";
import "./TrainingPage.css";
import Layout from "../../../components/Instructor/LayoutPages/Layout";
import TrainingsForm from "../../../components/TrainingsForm/TrainingsForm";
import TrainingsTable from "../../../components/TrainingsTable/TrainingsTable";
import Modal from "../../../components/Modal/Modal";
import api from "../../../api";
import { toast } from "react-toastify";

function TrainingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [associations, setAssociations] = useState([]);

  const fetchAssociations = async () => {
    try {
      const response = await api.get("/workouts-clients");
      setAssociations(response.data);
    } catch (error) {
      console.error("Erro ao buscar as associações:", error);
      toast.error("Erro ao carregar as associações.");
    }
  };

  useEffect(() => {
    fetchAssociations();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="trainings-content">
        <header className="trainings-header">
          <h1>Associação de Treinos</h1>
          <button onClick={handleOpenModal} className="btn add-training">
            Associar Treino
          </button>
        </header>

        <TrainingsTable associations={associations} fetchAssociations={fetchAssociations} />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TrainingsForm
            fetchAssociations={fetchAssociations}
            onTrainingAssigned={handleCloseModal}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default TrainingPage;
