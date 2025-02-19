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
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "all",
    sortBy: "title",
    sortOrder: "asc",
    itemsPerPage: 5, 
  });


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

        <WarningTable warnings={warnings} filters={filters} setFilters={setFilters} />

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <WarningForm
            onWarningCreated={() => {
              fetchWarnings();
              setIsModalOpen(false);
            }}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminWarnings;
