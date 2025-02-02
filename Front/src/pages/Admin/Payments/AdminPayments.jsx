import React, { useEffect, useState } from "react";
import "./AdminPayments.css";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import PayForm from "../../../components/Admin/PayForm/PayForm";
import PaymentsTable from "../../../components/Admin/PaymentsTable/PaymentsTable";
import Modal from "../../../components/Modal/Modal"; 
import api from "../../../api";
import { toast } from "react-toastify";

function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout>
      <div className="payments-content">
        <header className="payments-header">
          <h1>Pagamentos</h1>
          <button onClick={handleOpenModal} className="btn add-payment">
            Adicionar Pagamento
          </button>
        </header>

        <PaymentsTable payments={payments} onPaymentDeleted={fetchPayments} />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <PayForm
            onPaymentCreated={() => {
              fetchPayments();
              handleCloseModal();
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminPayments;
