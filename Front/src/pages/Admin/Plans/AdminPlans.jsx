import React, { useState, useEffect } from "react";
import Layout from "../../../components/LayoutPages/Layout";
import PlansForm from "../../../components/Admin/PlansForm/PlansForm";
import PlansTable from "../../../components/Admin/PlansTable/PlansTable";
import api from "../../../api";
import { toast } from "react-toastify";
import "./AdminPlans.css";

function AdminPlans() {
  const [plans, setPlans] = useState([]); // Estado para armazenar os planos

  // Função para buscar os planos
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

  // Carrega os planos ao montar o componente
  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <Layout>
      <div className="plans-content">
        <header className="plans-header">
          <h1>Planos</h1>
        </header>

        {/* Formulário de criação */}
        <PlansForm onPlanCreated={fetchPlans} />

        {/* Tabela de planos */}
        <PlansTable plans={plans} onPlanDeleted={fetchPlans} />
      </div>
    </Layout>
  );
}

export default AdminPlans;
