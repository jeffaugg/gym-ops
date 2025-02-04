
import React, { useState } from "react";
import "./PlansTable.css";
import api from "../../../api";
import { toast } from "react-toastify";
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

export default function PlansTable({ plans, onPlanDeleted, setSelectedPlan, selectedPlan }) {
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
    }finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  return (
    <div className="plans-list">
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
          {plans.length > 0 ? (
            plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.name}</td>
                <td>R$ {plan.price.toFixed(2)}</td>
                <td>{plan.duration} dias</td>
                <td>{plan.spots}</td>
                <td>
                  <button className="btn edit" onClick={() => setSelectedPlan(plan)}>
                    ✏️
                  </button>
                  <button className="btn delete" onClick={() => confirmDelete(plan.id)}>
                    ❌
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
