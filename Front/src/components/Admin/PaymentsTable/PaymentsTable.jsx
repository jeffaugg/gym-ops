import React, { useEffect, useState } from "react";
import "./PaymentsTable.css";
import { toast } from "react-toastify";
import api from "../../../api";

export default function PaymentsTable({ payments, onPaymentDeleted }) {
  const [paymentsWithDetails, setPaymentsWithDetails] = useState([]);

  // Função para buscar os detalhes dos alunos
  const fetchPaymentsDetails = async () => {
    try {
      // Mapeia os pagamentos e busca os detalhes do aluno para cada um
      const updatedPayments = await Promise.all(
        payments.map(async (payment) => {
          try {
            const response = await api.get(`/clients/${payment.id_aluno}`);
            return { ...payment, aluno: response.data }; // Adiciona os detalhes do aluno ao pagamento
          } catch (error) {
            console.error(`Erro ao buscar detalhes do aluno ID: ${payment.id_aluno}`, error);
            return { ...payment, aluno: { name: "N/A", cpf: "N/A" } }; // Retorna com dados vazios caso falhe
          }
        })
      );

      setPaymentsWithDetails(updatedPayments);
    } catch (error) {
      console.error("Erro ao buscar os detalhes dos pagamentos:", error);
      toast.error("Erro ao carregar os detalhes dos pagamentos.");
    }
  };

  // Atualiza os detalhes dos pagamentos sempre que `payments` mudar
  useEffect(() => {
    if (payments.length > 0) {
      fetchPaymentsDetails();
    }
  }, [payments]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/pay/${id}`);
      toast.success("Pagamento deletado com sucesso!");
      onPaymentDeleted(); // Atualiza a tabela
    } catch (error) {
      console.error("Erro ao deletar pagamento:", error);
      toast.error("Erro ao deletar pagamento.");
    }
  };

  const paymentMethods = {
    CARD: "Cartão de Crédito",
    MONEY: "Dinheiro",
    PIX: "Pix",
    BANK_SLIP: "Boleto",
  };

  return (
    <div className="payments-list">
      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>CPF</th>
            <th>ID do Plano</th>
            <th>Método de Pagamento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {paymentsWithDetails.length > 0 ? (
            paymentsWithDetails.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.aluno?.name || "N/A"}</td>
                <td>{payment.aluno?.cpf || "N/A"}</td>
                <td>{payment.id_plano}</td>
                <td>{paymentMethods[payment.payment] || "N/A"}</td>
                <td>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(payment.id)}
                  >
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">Nenhum pagamento encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}