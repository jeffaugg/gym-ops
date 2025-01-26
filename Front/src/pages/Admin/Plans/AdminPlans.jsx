import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import PlansForm from "../../../components/Admin/PlansForm/PlansForm";
import PlansTable from "../../../components/Admin/PlansTable/PlansTable";
import api from "../../../api";
import { toast } from "react-toastify";
import "./AdminPlans.css";

function AdminPlans() {
  const [plans, setPlans] = useState([]); 
  const [selectedPlan, setSelectedPlan] = useState(null); 

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

  useEffect(() => {
    fetchPlans();
  }, []);

  return (
    <Layout>
      <div className="plans-content">
        <header className="plans-header">
          <h1>Planos</h1>
        </header>

        <PlansForm
          onPlanCreated={fetchPlans}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
        />

        <PlansTable
          plans={plans}
          onPlanDeleted={fetchPlans}
          setSelectedPlan={setSelectedPlan}
          selectedPlan={selectedPlan}
        />
      </div>
    </Layout>
  );
}

export default AdminPlans;
