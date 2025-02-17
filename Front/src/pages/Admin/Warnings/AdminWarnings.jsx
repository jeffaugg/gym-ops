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
  const [noMoreItems, setNoMoreItems] = useState(false); // Estado para exibir a mensagem
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "all",
    sortBy: "title",
    sortOrder: "asc",
    currentPage: 1,
    itemsPerPage: 5, // Inicialmente 5 itens por página
  });

  // Busca os avisos conforme os filtros atuais
  const fetchWarnings = async () => {
    try {
      const response = await api.get(`/message?page=${filters.currentPage}&limit=${filters.itemsPerPage}`);

      if (response.data.length === 0) {
        if (!noMoreItems) {
          setNoMoreItems(true); // Exibe a mensagem apenas na primeira vez
          toast.info("Não há mais itens para exibir.");
        }
        setFilters((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
        return;
      }

      setNoMoreItems(false); // Reseta o aviso se encontrar itens
      setWarnings(response.data);
    } catch (error) {
      console.error("Erro ao buscar as mensagens:", error);
      toast.error("Erro ao buscar as mensagens.");
    }
  };

  // Refaz a busca sempre que `filters` mudar
  useEffect(() => {
    fetchWarnings();
  }, [filters.currentPage, filters.itemsPerPage]);

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
