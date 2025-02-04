import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import "./StudentDetails.css";
import api from "../../../api";

export default function StudentDetails({ selectedStudent }) {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await api.get("/plan");
        setPlans(response.data);
      } catch (error) {
        console.error("Erro ao buscar os planos:", error);
      }
    };

    fetchPlans();
  }, []);

  if (!selectedStudent) return null;

  const formattedDate = selectedStudent.date_of_birth
    ? format(new Date(selectedStudent.date_of_birth), "dd/MM/yyyy")
    : "";

  const planName = plans.find((plan) => plan.id === selectedStudent.plan_id)?.name || "N/A";

  return (
    <div className="student-details">
      <h2>Informações do Aluno</h2>
      <div className="details-group">
        <p><strong>Nome:</strong> {selectedStudent.name}</p>
        <p><strong>Data de Nascimento:</strong> {formattedDate}</p>
        <p><strong>CPF:</strong> {selectedStudent.cpf}</p>
        <p><strong>Telefone:</strong> {selectedStudent.telephone}</p>
        <p><strong>Email:</strong> {selectedStudent.email}</p>
        <p><strong>Gênero:</strong> {selectedStudent.gender}</p>
        <p><strong>Plano:</strong> {planName}</p>
        <p><strong>Status:</strong> {selectedStudent.status ? "Ativo" : "Inativo"}</p>
        <p><strong>Observações de Saúde:</strong> {selectedStudent.health_notes || "Nenhuma"}</p>
      </div>
    </div>
  );
}
