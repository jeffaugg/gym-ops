import React, { useState, useEffect } from "react";
import "./PayForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";

export default function PayForm({ onPaymentCreated }) {
  const [plan, setPlan] = useState("");
  const [plans, setPlans] = useState([]);
  const [aluno, setAluno] = useState(null);
  const [cpf, setCpf] = useState("");
  const [payment, setPayment] = useState("");

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

  const searchAluno = async (event) => {
    event.preventDefault();
    try {
      const response = await api.get(`/clients/cpf/${cpf}`);
      setAluno(response.data);
      toast.success("Aluno encontrado com sucesso!");
    } catch (error) {
      console.error("Erro ao buscar o aluno:", error);
      setAluno(null);
      toast.error("Erro ao buscar o aluno.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!aluno || !aluno.id) {
      toast.error("Nenhum aluno foi encontrado. Busque um aluno antes de prosseguir.");
      return;
    }

    if (!plan) {
      toast.error("Por favor, selecione um plano.");
      return;
    }

    try {

      const response = await api.post("/pay", {
        id_aluno: aluno.id,
        id_plano: Number(plan),
        status: true,
        payment,
      });

      toast.success("Pagamento efetuado com sucesso!");

   
      setPlan("");
      setAluno(null);
      setCpf("");
      setPayment("");

      onPaymentCreated();
    } catch (error) {
      console.error("Erro ao efetuar o pagamento:", error);
      toast.error("Erro ao efetuar o pagamento.");
    }
  };

  return (
    <div className="pay-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputFieldForm
            label="CPF*"
            type="text"
            placeholder="CPF no formato XXX.XXX.XXX-XX"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask={"999.999.999-99"}
          />
          <button type="button" onClick={searchAluno} className="btn search">
            Buscar Aluno
          </button>
        </div>

        {aluno && (
          <div>
            <p><strong>Aluno encontrado:</strong> {aluno.name}</p>
            <br />
          </div>
        )}

        <div className="form-group">
          <label>
            Plano*
            <select required value={plan} onChange={(e) => setPlan(e.target.value)}>
              <option value="">Selecione</option>
              {plans.map((plan) => (
                <option key={plan.id} value={plan.id}>
                  {plan.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Método de pagamento*
            <select required value={payment} onChange={(e) => setPayment(e.target.value)}>
              <option value="">Selecione</option>
              <option value="PIX">Pix</option>
              <option value="MONEY">Dinheiro</option>
              <option value="BANK_SLIP">Boleto</option>
              <option value="CARD">Cartão</option>
            </select>
          </label>
        </div>

        <div className="form-actions">
          <ButtonCancel />
          <ButtonSend />
        </div>
      </form>
    </div>
  );
}
