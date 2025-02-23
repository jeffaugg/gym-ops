import React, { useState, useEffect } from "react";
import "./TrainingsForm.css";
import InputFieldForm from "../InputFieldForm/InputFieldForm";
import ButtonCancel from "../ButtonCancel/ButtonCancel";
import ButtonSend from "../ButtonSend/ButtonSend";
import api from "../../api";
import { toast } from "react-toastify";

export default function TrainingsForm({ fetchAssociations, onTrainingAssigned }) {
  const [treinos, setTreinos] = useState([]);
  const [treino, setTreino] = useState("");
  const [aluno, setAluno] = useState(null);
  const [cpf, setCpf] = useState("");

  useEffect(() => {
    const fetchTreinos = async () => {
      try {
        const response = await api.get("/workouts");
        setTreinos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os treinos:", error);
      }
    };
    fetchTreinos();
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

    if (!treino) {
      toast.error("Por favor, selecione um treino.");
      return;
    }

    try {
      await api.post("/workouts-clients", {
        aluno_id: aluno.id,
        treino_id: Number(treino),
      });

      toast.success("Treino associado com sucesso!");

      setTreino("");
      setAluno(null);
      setCpf("");

      // Atualiza a tabela de associações
      fetchAssociations();

      onTrainingAssigned();
    } catch (error) {
      console.error("Erro ao associar treino:", error);
      toast.error("Erro ao associar treino.");
    }
  };

  return (
    <div className="trainings-form">
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
        </div>
        <div className="form-group">
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
            Treino*
            <select required value={treino} onChange={(e) => setTreino(e.target.value)}>
              <option value="">Selecione</option>
              {treinos.map((treino) => (
                <option key={treino.id} value={treino.id}>
                  {treino.name}
                </option>
              ))}
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
