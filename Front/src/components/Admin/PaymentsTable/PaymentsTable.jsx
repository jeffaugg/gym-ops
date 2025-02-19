import React, { useState, useEffect } from "react";
import "./PaymentsTable.css";
import { toast } from "react-toastify";
import api from "../../../api";
import { MdOutlineDelete } from "react-icons/md";
import FilterBar from "../../FilterBar/FilterBar"; 
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

const paymentMethods = {
  CARD: "Cartão de Crédito",
  MONEY: "Dinheiro",
  PIX: "Pix",
  BANK_SLIP: "Boleto",
};

export default function PaymentsTable({ payments, onPaymentDeleted, filters, setFilters }) {
  const [paymentsWithDetails, setPaymentsWithDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const fetchPaymentsDetails = async (paymentsList) => {
    setLoading(true);
    try {
      const updatedPayments = await Promise.all(
        paymentsList.map(async (payment) => {
          let aluno = { name: "N/A", cpf: "N/A" };
          let plan = { name: "N/A", price: "N/A" };

          try {
            const alunoResponse = await api.get(`/clients/${payment.id_aluno}`);
            aluno = alunoResponse.data;
          } catch (error) {
            console.error(`Erro ao buscar detalhes do aluno ID: ${payment.id_aluno}`, error);
          }

          try {
            const planResponse = await api.get(`/plan/${payment.id_plano}`);
            plan = planResponse.data;
          } catch (error) {
            console.error(`Erro ao buscar detalhes do plano ID: ${payment.id_plano}`, error);
          }

          return { ...payment, aluno, plan };
        })
      );

      setPaymentsWithDetails(updatedPayments);
    } catch (error) {
      console.error("Erro ao buscar os detalhes dos pagamentos:", error);
      toast.error("Erro ao carregar os detalhes dos pagamentos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (payments && payments.length > 0) {
      fetchPaymentsDetails(payments);
    } else {
      setPaymentsWithDetails([]);
    }
  }, [payments]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/pay/${id}`);
      toast.success("Pagamento deletado com sucesso!");
      onPaymentDeleted();
    } catch (error) {
      console.error("Erro ao deletar pagamento:", error);
      toast.error("Erro ao deletar pagamento.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const filteredAndSortedPayments = paymentsWithDetails
    .filter((payment) => {
      const matchesSearch =
        payment.aluno?.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        payment.aluno?.cpf.includes(filters.searchTerm) ||
        payment.aluno?.telephone.includes(filters.searchTerm);

      const matchesPaymentMethod =
        filters.filterBy === "all" ||
        (filters.filterBy === "CARD" && payment.payment === "CARD") ||
        (filters.filterBy === "MONEY" && payment.payment === "MONEY") ||
        (filters.filterBy === "PIX" && payment.payment === "PIX") ||
        (filters.filterBy === "BANK_SLIP" && payment.payment === "BANK_SLIP");

      return matchesSearch && matchesPaymentMethod;
    })
    .sort((a, b) => {
      if (filters.sortBy === "payment_date") {
        return filters.sortOrder === "asc"
          ? new Date(a.payment_date) - new Date(b.payment_date)
          : new Date(b.payment_date) - new Date(a.payment_date);
      } else if (filters.sortBy === "payment") {
        return filters.sortOrder === "asc"
          ? a.payment.localeCompare(b.payment)
          : b.payment.localeCompare(a.payment);
      } else if (filters.sortBy === "id_aluno") {
        return filters.sortOrder === "asc" ? a.id_aluno - b.id_aluno : b.id_aluno - a.id_aluno;
      } else if (filters.sortBy === "id_plano") {
        return filters.sortOrder === "asc" ? a.id_plano - b.id_plano : b.id_plano - a.id_plano;
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="payments-list">
      {loading && <div>Carregando detalhes...</div>}
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome, CPF ou método de pagamento"
        filterOptions={[
          { value: "all", label: "Todos" },
          { value: "CARD", label: "Cartão de Crédito" },
          { value: "MONEY", label: "Dinheiro" },
          { value: "PIX", label: "Pix" },
          { value: "BANK_SLIP", label: "Boleto" },
        ]}
        sortOptions={[
          { value: "payment_date", label: "Data de Pagamento" },
          { value: "payment", label: "Método de Pagamento" },
          { value: "id_aluno", label: "Aluno" },
          { value: "id_plano", label: "Plano" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>CPF</th>
            <th>Nome do Plano</th>
            <th>Preço do Plano</th>
            <th>Método de Pagamento</th>
            <th>Data do Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedPayments.length > 0 ? (
            filteredAndSortedPayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.aluno?.name || "N/A"}</td>
                <td>{payment.aluno?.cpf || "N/A"}</td>
                <td>{payment.plan?.name || "N/A"}</td>
                <td>{payment.plan?.price || "N/A"}</td>
                <td>{paymentMethods[payment.payment] || "N/A"}</td>
                <td>{new Date(payment.payment_date).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</td>
                <td className="actions">
                  <button
                    className="btn delete"
                    onClick={() => confirmDelete(payment.id)}
                  >
                    <MdOutlineDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            !loading && (
              <tr>
                <td colSpan="6">Nenhum pagamento encontrado.</td>
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
          message={`Tem certeza que deseja deletar este pagamento de "${paymentsWithDetails.find(payment => payment.id === selectedId)?.aluno?.name}" do dia ${new Date(paymentsWithDetails.find(payment => payment.id === selectedId)?.payment_date).toLocaleString("pt-BR", { dateStyle: "short" })}"?`}
        />
      )}
    </div>
  );
}
