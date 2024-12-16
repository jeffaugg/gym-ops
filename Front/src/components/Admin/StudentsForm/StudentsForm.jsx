import { format } from "date-fns";
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

  const handleCancel = () => {
    setName("");
    setBirthDate("");
    setCpf("ALL");
    setGen("");
    setPlan("");
    setPhone("");
    setEmail("");
    setHealth("");
    toast.info("Mensagem cancelada.");
  };

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
      const formattedDate = selectedStudent.date_of_birth
        ? format(new Date(selectedStudent.date_of_birth), "yyyy-MM-dd")
        : "";
      setBirthDate(formattedDate);
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

    if (!birthDate) {
      toast.error("A data de nascimento é obrigatória.");
      return;
    }

    try {
      if (selectedStudent) {
        const formattedBirthDate = format(new Date(birthDate), "yyyy-MM-dd");
        // Atualiza o estudante existente
        await api.put(`/clients/${selectedStudent.id}`, {
          name,
          date_of_birth: formattedBirthDate,
          email,
          telephone: phone,
          cpf,
          plan_id: Number(plan),
          health_notes: health,
        });
        toast.success("Aluno atualizado com sucesso!");
      } else {
        const formattedBirthDate = format(new Date(birthDate), "yyyy-MM-dd");
        // Cria um novo estudante
        await api.post("/clients", {
          name,
          date_of_birth: formattedBirthDate,
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
            mask={"999.999.999-99"}
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
            mask={"(99) 99999-9999"}
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
          <ButtonSend isEditing={!!selectedStudent} />
          <ButtonCancel onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}
