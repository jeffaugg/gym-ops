import React, {useState} from "react";
import "./PlansTable.css";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import { toast } from "react-toastify";
import FilterBar from "../../FilterBar/FilterBar"; 
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

export default function PlansTable({
  plans,
  onPlanDeleted,
  setSelectedPlan,
  selectedPlan,
  filters,
  setFilters
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/plan/${id}`);
      if (selectedPlan && selectedPlan.id === id) {
        setSelectedPlan(null);
      }
      toast.success("Plano deletado com sucesso!");
      onPlanDeleted();
    } catch (error) {
      console.error("Erro ao deletar o plano:", error);
      toast.error("Erro ao deletar o plano.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const filteredAndSortedPlans = plans
    .filter((plan) => {
      const matchesSearch =
        plan.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        plan.price.toString().includes(filters.searchTerm);

      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return filters.sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
       } else if (filters.sortBy === "price") {
        return filters.sortOrder === "asc"
          ? a.price - b.price
          : b.price - a.price;
      } else if (filters.sortBy === "spots") {
        return filters.sortOrder === "asc"
          ? a.spots - b.spots
          : b.spots - a.spots;
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="plans-list">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome ou valor"
        filterOptions={[{ value: "all", label: "Todos" }]}
        sortOptions={[
          { value: "name", label: "Nome" },
          { value: "price", label: "Preço" },
          { value: "spots", label: "Qtd. de vagas" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Duração</th>
            <th>Qtd. de vagas</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedPlans.length > 0 ? (
            filteredAndSortedPlans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.name}</td>
                <td>R$ {plan.price.toFixed(2)}</td>
                <td>{plan.duration} dias</td>
                <td>{plan.spots}</td>
                <td className="actions">
                  <button className="btn edit" onClick={() => setSelectedPlan(plan)}>
                    <FaPenToSquare />
                  </button>
                  <button className="btn delete" onClick={() => confirmDelete(plan.id)}>
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum plano encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          message={`Tem certeza que deseja deletar este plano "${plans.find(plan => plan.id === selectedId)?.name}"?`}
        />
      )}
    </div>
  );
}
