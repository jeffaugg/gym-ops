import React, { useEffect, useState } from "react";
import "./AdminPayments.css";
import Layout from "../../../components/LayoutPages/Layout";
import PayForm from "../../../components/Admin/PayForm/PayForm";
import PaymentsTable from "../../../components/Admin/PaymentsTable/PaymentsTable";
import api from "../../../api";
import { toast } from "react-toastify";

function AdminPayments() {
  const [payments, setPayments] = useState([]); // Estado para armazenar os pagamentos

  // Função para buscar os pagamentos
  const fetchPayments = async () => {
    try {
      const response = await api.get("/pay");
      const sortedPayments = response.data.sort((a, b) => b.id - a.id);
      setPayments(sortedPayments);
    } catch (error) {
      console.error("Erro ao buscar os pagamentos:", error);
      toast.error("Erro ao buscar os pagamentos.");
    }
  };

  // Carrega os pagamentos ao montar o componente
  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <Layout>
      <div className="payments-content">
        <header className="payments-header">
          <h1>Pagamentos</h1>
        </header>
        <PayForm onPaymentCreated={fetchPayments} />
        <PaymentsTable payments={payments} onPaymentDeleted={fetchPayments} />
      </div>
    </Layout>
  );
}

export default AdminPayments;
