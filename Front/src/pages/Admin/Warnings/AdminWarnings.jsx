import React, { useState, useEffect } from "react";
import "./AdminWarnings.css";
import WarningForm from "../../../components/Admin/WarningForm/WarningForm";
import WarningTable from "../../../components/Admin/WarningTable/WarningTable";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import Modal from "../../../components/Modal/Modal";
import api from "../../../api";
import { toast } from "react-toastify";

function AdminWarnings() {
  const [warnings, setWarnings] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const fetchWarnings = async () => {
    try {
      const response = await api.get("/message");
      const sortedwarnings = response.data.sort((a, b) => b.id - a.id);
      setWarnings(sortedwarnings);
    } catch (error) {
      console.error("Erro ao buscar as mensagens:", error);
      toast.error("Erro ao buscar as mensagens.");
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("fetching warnings");
    fetchWarnings();
    console.log("warnings fetched");
  }, []);


  return (
    <Layout>
      <div className="warnings-content">
        <header className="warnings-header">
          <h1>Avisos</h1>
          <button onClick={handleOpenModal} className="btn add-warning">
            Novo Aviso
          </button>
        </header>
        <WarningTable warnings={warnings} />
      
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <WarningForm
            onWarningCreated={() => {
              fetchWarnings();
              handleCloseModal();
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminWarnings;