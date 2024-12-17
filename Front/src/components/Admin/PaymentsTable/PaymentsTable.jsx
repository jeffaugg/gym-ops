import React, { useEffect, useState } from "react";
import "./PaymentsTable.css";
import { toast } from "react-toastify";
import api from "../../../api";

const paymentMethods = {
  CARD: "Cartão de Crédito",
  MONEY: "Dinheiro",
  PIX: "Pix",
  BANK_SLIP: "Boleto",
};

export default function PaymentsTable({ payments, onPaymentDeleted }) {
  const [paymentsWithDetails, setPaymentsWithDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // Função para buscar os detalhes do aluno e do plano
  const fetchPaymentsDetails = async (paymentsList) => {
    setLoading(true);
    try {
      const updatedPayments = await Promise.all(
        paymentsList.map(async (payment) => {
          let aluno = { name: "N/A", cpf: "N/A" };
          let plan = { name: "N/A", price: "N/A" };

          // Buscar detalhes do aluno
          try {
            const alunoResponse = await api.get(`/clients/${payment.id_aluno}`);
            aluno = alunoResponse.data;
          } catch (error) {
            console.error(`Erro ao buscar detalhes do aluno ID: ${payment.id_aluno}`, error);
          }

          // Buscar detalhes do plano
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

  // Atualiza os detalhes dos pagamentos sempre que `payments` mudar
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
      onPaymentDeleted(); // Atualiza a tabela
    } catch (error) {
      console.error("Erro ao deletar pagamento:", error);
      toast.error("Erro ao deletar pagamento.");
    }
  };

  return (
    <div className="payments-list">
      {loading && <div>Carregando detalhes...</div>}
      <table>
        <thead>
          <tr>
            <th>Nome do Aluno</th>
            <th>CPF</th>
            <th>Nome do Plano</th>
            <th>Preço do Plano</th>
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
                <td>{payment.plan?.name || "N/A"}</td>
                <td>{payment.plan?.price || "N/A"}</td>
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
            !loading && (
              <tr>
                <td colSpan="6">Nenhum pagamento encontrado.</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
