import React, { useState } from "react";
import InputFieldForm from "../InputFieldForm/InputFieldForm";
import "./PresenceForm.css";
import { toast } from "react-toastify";
import api from "../../api";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import ButtonSend from "../ButtonSend/ButtonSend";

export default function PresenceForm({ onPresenceCreated }) {
    const [cpf, setCpf] = useState("");
    const [aluno, setAluno] = useState(null);

    const handleCancel = () => {
        setCpf("");
        setAluno("");
        setTreinoId(null);
        toast.info("Criação de frequência cancelada.");
      };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!aluno || !aluno.id) {
            toast.error("Nenhum aluno foi encontrado. Busque um aluno antes de prosseguir.");
            return;
        }

        try {
            await api.post(`/presence/${aluno.id}`);
            toast.success(`Frequência registrada com sucesso!`);
            setCpf("");
            setAluno(null);
            onPresenceCreated();
        } catch (error) {
            console.error("Erro ao registrar a presença:", error);
            toast.error(error.response?.data?.message || "Erro ao registrar a presença.");
        }
    };

    const searchAluno = async (event) => {
        event.preventDefault();

        try {
            const response = await api.get(`/clients/cpf/${cpf}`);
            setAluno(response.data);
            toast.success(`Aluno ${response.data.name} encontrado com sucesso!`);
        } catch (error) {
            console.error("Erro ao buscar o aluno:", error);
            setAluno(null);
            toast.error("Erro ao buscar o aluno.");
        }
    };

    return (
        <div className="presence-form">
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
                        <p>
                            <strong>Aluno encontrado:</strong> {aluno.name}
                        </p>
                        <br />
                    </div>
                )}
                <div className="form-actions">
                    <ButtonCancel onClick={handleCancel}/>
                    <ButtonSend />
                </div>
            </form>
        </div>
    );
}
