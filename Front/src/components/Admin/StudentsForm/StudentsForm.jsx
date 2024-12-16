import React, { useState, useEffect } from "react";
import "./StudentsForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";

export default function StudentsForm({ onStudentCreated, selectedStudent, setSelectedStudent }) {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [cpf, setCpf] = useState("");
  const [gen, setGen] = useState("");
  const [plan, setPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [health, setHealth] = useState("");
  const [plans, setPlans] = useState([]);

  // Fetch available plans
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

  // Preenche o formulário quando `selectedStudent` mudar
  useEffect(() => {
    if (selectedStudent) {
      setName(selectedStudent.name || "");
      setBirthDate(selectedStudent.date_of_birth || "");
      setCpf(selectedStudent.cpf || "");
      setGen(selectedStudent.gender || "");
      setPlan(selectedStudent.plan_id || "");
      setPhone(selectedStudent.telephone || "");
      setEmail(selectedStudent.email || "");
      setHealth(selectedStudent.health_notes || "");
    } else {
      // Limpa o formulário se nenhum estudante estiver selecionado
      setName("");
      setBirthDate("");
      setCpf("");
      setGen("");
      setPlan("");
      setPhone("");
      setEmail("");
      setHealth("");
    }
  }, [selectedStudent]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (selectedStudent) {
        // Atualiza o estudante existente
        await api.put(`/clients/${selectedStudent.id}`, {
          name,
          date_of_birth: birthDate,
          email,
          telephone: phone,
          cpf,
          plan_id: Number(plan),
          health_notes: health,
        });
        toast.success("Aluno atualizado com sucesso!");
      } else {
        // Cria um novo estudante
        await api.post("/clients", {
          name,
          date_of_birth: birthDate,
          email,
          telephone: phone,
          cpf,
          plan_id: Number(plan),
          health_notes: health,
        });
        toast.success("Aluno criado com sucesso!");
      }

      // Limpa o formulário
      setName("");
      setBirthDate("");
      setCpf("");
      setGen("");
      setPlan("");
      setPhone("");
      setEmail("");
      setHealth("");

      // Reseta o estudante selecionado
      setSelectedStudent(null);

      // Atualiza a lista de estudantes
      onStudentCreated();
    } catch (error) {
      console.error("Erro ao salvar o aluno:", error);
      toast.error("Erro ao salvar o aluno.");
    }
  };

  return (
    <div className="students-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputFieldForm
            label="Nome*"
            type="text"
            placeholder="Digite o nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputFieldForm
            label="Data de nascimento*"
            type="date"
            placeholder=""
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <InputFieldForm
            label="CPF*"
            type="text"
            placeholder="CPF no formato XXX.XXX.XXX-XX"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
          <label>
            Gênero*
            <select required value={gen} onChange={(e) => setGen(e.target.value)}>
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </label>
        </div>

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
          <InputFieldForm
            label="Telefone*"
            type="text"
            placeholder="(XX) XXXXX-XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <InputFieldForm
            label="Email*"
            type="email"
            placeholder="Digite o email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputFieldForm
            label="Observações de saúde"
            type="text"
            placeholder="Digite as observações de saúde"
            value={health}
            onChange={(e) => setHealth(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <ButtonCancel /> 
          <ButtonSend isEditing={!!selectedStudent} />
        </div>
      </form>
    </div>
  );
}
