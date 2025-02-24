import React, { useEffect, useState } from "react";
import "./PresenceTable.css";
import { toast } from "react-toastify";
import { format } from "date-fns";
import api from "../../api";
import { MdOutlineDelete } from "react-icons/md";
import FilterBar from "../FilterBar/FilterBar"; 
import ConfirmationModal from "../Modal/ConfirmationModal/ConfirmationModal";

export default function PresenceTable({ reload, onPresenceDeleted, filters, setFilters }) {
  const [presences, setPresences] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchPresences = async () => {
    setLoading(true);
    try {
      const response = await api.get("/presence");
      setPresences(response.data);
    } catch (error) {
      console.error("Erro ao buscar presenças:", error);
      toast.error("Erro ao buscar presenças.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresences();
  }, [reload]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/presence/${id}`);
      toast.success("Presença deletada com sucesso!");
      onPresenceDeleted(); 
    } catch (error) {
      console.error("Erro ao deletar presença:", error);
      toast.error("Erro ao deletar presença.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const filteredAndSortedPresences = presences
    .filter((presence) => {
      const matchesSearch =
        presence.aluno_id?.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        presence.aluno_id?.cpf.includes(filters.searchTerm);

      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "data") {
        return filters.sortOrder === "asc"
          ? new Date(a.data) - new Date(b.data)
          : new Date(b.data) - new Date(a.data);
      }else if (filters.sortBy === "aluno_id?.name") {
        return filters.sortOrder === "asc"
          ? a.aluno_id?.name.localeCompare(b.aluno_id?.name)
          : b.aluno_id?.name.localeCompare(a.aluno_id?.name);
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="presence-list">
      {loading && <div>Carregando detalhes...</div>}
      
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome ou CPF"
        filterOptions={[{ value: "all", label: "Todos" }]}
        sortOptions={[
          { value: "data", label: "Data e Hora" },
          { value: "aluno_id?.name", label: "Aluno" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>CPF</th>
            <th>Data e Hora</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedPresences.length > 0 ? (
            filteredAndSortedPresences.map((presence) => (
              <tr key={presence.id}>
                <td>{presence.aluno_id?.name || "N/A"}</td>
                <td>{presence.aluno_id?.cpf || "N/A"}</td>
                <td>
                  {presence.data
                    ? format(new Date(presence.data), "dd/MM/yyyy HH:mm:ss")
                    : "N/A"}
                </td>
                <td className="actions">
                  <button
                    className="btn delete"
                    onClick={() => confirmDelete(presence.id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="4">Nenhuma presença encontrada.</td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          message={`Tem certeza que deseja deletar a presença de "${presences.find(presence => presence.id === selectedId)?.aluno_id?.name}" do dia ${format(new Date(presences.find(presence => presence.id === selectedId)?.data), "dd/MM/yyyy 'às' HH:mm:ss")}"?`}
        />
      )}
    </div>
  );
}
