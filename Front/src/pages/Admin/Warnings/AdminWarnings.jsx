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
  const [selectedWarning, setSelectedWarning] = useState(null);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "all",
    sortBy: "title",
    sortOrder: "asc",
    itemsPerPage: 5, 
  });


  const recipientTypeMap = {
    ALL: "Todos",
    INSTRUCTORS: "Somente Instrutores",
    STUDENTS: "Somente Alunos",
  };

  const fetchWarnings = async () => {
    try {
      const response = await api.get(`/message`, {
        params: {
          search: filters.searchTerm,
          filterBy: filters.filterBy !== "all" ? filters.filterBy : undefined,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          limit: filters.itemsPerPage,
        },
      });
      setWarnings(response.data);
    } catch (error) {
      console.error("Erro ao buscar as mensagens:", error);
      toast.error("Erro ao buscar as mensagens.");
    }
  };

  const handleViewWarning = async (id) => {
    try {
      const response = await api.get(`/message/${id}`);
      setSelectedWarning(response.data);
      setDetailModalOpen(true);
    } catch (error) {
      console.error("Erro ao buscar a mensagem:", error);
      toast.error("Erro ao buscar a mensagem.");
    }
  };

  useEffect(() => {
    fetchWarnings();
  }, [filters]); 

  return (
    <Layout>
      <div className="warnings-content">
        <header className="warnings-header">
          <h1>Avisos</h1>
          <button onClick={() => setIsModalOpen(true)} className="btn add-warning">
            Novo Aviso
          </button>
        </header>

        <WarningTable
          warnings={warnings}
          filters={filters}
          setFilters={setFilters}
          onViewWarning={handleViewWarning}
        />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <WarningForm
            onWarningCreated={() => {
              fetchWarnings();
              setIsModalOpen(false);
            }}
          />
        </Modal>

        <Modal isOpen={detailModalOpen} onClose={() => setDetailModalOpen(false)}>
          {selectedWarning && (
            <div className="warning-detail">
              <h2>{selectedWarning.title}</h2>
              <p>{selectedWarning.body}</p>
              <p>
                <strong>Enviada para:</strong> {recipientTypeMap[selectedWarning.recipient_type]}
              </p>
            </div>
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminWarnings;
