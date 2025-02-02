import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import PlansForm from "../../../components/Admin/PlansForm/PlansForm";
import PlansTable from "../../../components/Admin/PlansTable/PlansTable";
import Modal from "../../../components/Modal/Modal";
import api from "../../../api";
import { toast } from "react-toastify";
import "./AdminPlans.css";

function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPlans = async () => {
    try {
      const response = await api.get("/plan");
      const sortedPlans = response.data.sort((a, b) => b.id - a.id);
      setPlans(sortedPlans);
    } catch (error) {
      console.error("Erro ao buscar os planos:", error);
      toast.error("Erro ao buscar os planos.");
    }
  };

  const handleOpenModal = () => {
    setSelectedPlan(null);
    setIsModalOpen(true);
  };

  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlan(null);
  };


  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <Layout>
      <div className="plans-content">
        <header className="plans-header">
          <h1>Planos</h1>
          <button onClick={handleOpenModal} className="btn add-plan">
            Adicionar Plano
          </button>
        </header>

        <PlansTable
          plans={plans}
          onPlanDeleted={fetchPlans}
          setSelectedPlan={handleEditPlan}
          selectedPlan={selectedPlan}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <PlansForm
            onPlanCreated={() => {
              fetchPlans();
              handleCloseModal();
            }}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminPlans;
