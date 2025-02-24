import React, { useState, useEffect } from "react";
import "./TrainingsTable.css";
import { toast } from "react-toastify";
import { MdOutlineDelete } from "react-icons/md";
import api from "../../api";
import ConfirmationModal from "../Modal/ConfirmationModal/ConfirmationModal";
import FilterBar from "../FilterBar/FilterBar";

export default function TrainingsTable({ fetchAssociations, filters, setFilters }) {
  const [associations, setAssociations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchAssociationsData = async () => {
    setLoading(true);
    try {
      const response = await api.get("/workouts-clients");

      const associationsWithDetails = await Promise.all(
        response.data.map(async (assoc) => {
          let alunoName = "N/A";
          let treinoName = "N/A";

          try {
            const alunoResponse = await api.get(`/clients/${assoc.aluno_id}`);
            alunoName = alunoResponse.data.name;
          } catch (error) {
            console.error(`Erro ao buscar aluno ID: ${assoc.aluno_id}`, error);
          }

          try {
            const treinoResponse = await api.get(`/workouts/${assoc.treino_id}`);
            treinoName = treinoResponse.data.name;
          } catch (error) {
            console.error(`Erro ao buscar treino ID: ${assoc.treino_id}`, error);
          }

          return {
            id: assoc.id,
            aluno_name: alunoName,
            treino_name: treinoName,
          };
        })
      );

      setAssociations(associationsWithDetails);
    } catch (error) {
      console.error("Erro ao buscar as associações:", error);
      toast.error("Erro ao carregar as associações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociationsData();
  }, [fetchAssociations]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/workouts-clients/${id}`);
      toast.success("Associação removida com sucesso!");
      fetchAssociationsData();
    } catch (error) {
      console.error("Erro ao deletar associação:", error);
      toast.error("Erro ao deletar associação.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const getAssociationDetails = (id) => {
    const assoc = associations.find(a => a.id === id);
    return assoc
      ? `"${assoc.aluno_name}" com "${assoc.treino_name}"`
      : "esta associação";
  };

  const filteredAndSortedAssociations = associations
    .filter((assoc) => {
      const matchesSearch =
        assoc.aluno_name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        assoc.treino_name.toLowerCase().includes(filters.searchTerm.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "aluno_name") {
        return filters.sortOrder === "asc"
          ? a.aluno_name.localeCompare(b.aluno_name)
          : b.aluno_name.localeCompare(a.aluno_name);
      } else if (filters.sortBy === "treino_name") {
        return filters.sortOrder === "asc"
          ? a.treino_name.localeCompare(b.treino_name)
          : b.treino_name.localeCompare(a.treino_name);
      } else if (filters.sortBy === "id") {
        return filters.sortOrder === "asc"
          ? a.id - b.id
          : b.id - a.id;
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="trainings-list">
      {loading && <p>Carregando associações...</p>}

      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome do aluno ou treino"
        filterOptions={[{ value: "all", label: "Todos" }]}
        sortOptions={[
          { value: "aluno_name", label: "Nome do Aluno" },
          { value: "treino_name", label: "Nome do Treino" },
          { value: "id", label: "ID da Associação" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>Nome do Treino</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedAssociations.length > 0 ? (
            filteredAndSortedAssociations.map((assoc) => (
              <tr key={assoc.id}>
                <td>{assoc.aluno_name || "N/A"}</td>
                <td>{assoc.treino_name || "N/A"}</td>
                <td className="actions">
                  <button
                    className="btn delete"
                    onClick={() => confirmDelete(assoc.id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">Nenhuma associação encontrada.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDelete(selectedId)}
        message={`Tem certeza que deseja remover a associação ${getAssociationDetails(selectedId)}?`}
      />
    </div>
  );
}
