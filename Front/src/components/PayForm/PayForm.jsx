import React from "react";
import "./PayForm.css";
import InputFieldForm from "../InputFieldForm/InputFieldForm";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import ButtonSend from "../ButtonSend/ButtonSend";
import api from "../../api";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function PayForm() {
    const [plan, setPlan] = useState("");
    const [plans, setPlans] = useState([]);
    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const response = await api.get("/plan"); // Endpoint para buscar os planos
                setPlans(response.data); // Atualiza o estado com os planos recebidos
            } catch (error) {
                console.error("Erro ao buscar os planos:", error);
            }
        };

        fetchPlans();
    }, []);

    return (
        <div className="pay-form">
            <form>
                <div className="form-group">
                    <InputFieldForm
                        label="Nome do titular*"
                        type="text"
                        placeholder=""
                    />
                    <InputFieldForm
                        label="CPF*"
                        type="text"
                        placeholder="CPF no formato XXX.XXX.XXX-XX"
                    />
                </div>
                <div className="form-group">
                    <label>
                        Planos*
                        <select
                            required
                            value={plan}
                            onChange={(e) => setPlan(e.target.value)}
                        >
                            <option value="">Selecione</option>
                            {plans.map((plan) => (
                                <option key={plan.id} value={plan.id}>
                                    {plan.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <InputFieldForm
                        label="Método de pagamento*"
                        type="text"
                        placeholder=""
                    />
                    <InputFieldForm
                        label="Data de pagamento*"
                        type="text"
                        placeholder=""
                    />
                </div>

                <div className="form-actions">
                    <ButtonCancel />
                    <ButtonSend />
                </div>
            </form>
        </div>
    );
}