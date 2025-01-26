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
  const [gen, setGen] = useState("O");
  const [plan, setPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [health, setHealth] = useState("");
  const [plans, setPlans] = useState([]);
  const [status, setStatus] = useState("true");

  const handleCancel = () => {
    const hasChanges = name || birthDate || cpf || gen || plan || phone || email || health ;
        if (hasChanges) {
          toast.info("Adição/Edição cancelada.");
        }
    setName("");
    setBirthDate("");
    setCpf("ALL");
    setGen("");
    setPlan("");
    setPhone("");
    setEmail("");
    setHealth("");
  };

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
      setStatus(selectedStudent.status ? "true" : "false");
    } else {
      setName("");
      setBirthDate("");
      setCpf("");
      setGen("");
      setPlan("");
      setPhone("");
      setEmail("");
      setHealth("");
      setStatus("true");
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
        await api.put(`/clients/${selectedStudent.id}`, {
          name,
          date_of_birth: formattedBirthDate,
          email,
          telephone: phone,
          cpf,
          plan_id: Number(plan),
          health_notes: health,
          status: status === "true",
          gender: gen,
        });
        toast.success("Aluno atualizado com sucesso!");
      } else {
        const formattedBirthDate = format(new Date(birthDate), "yyyy-MM-dd");
        await api.post("/clients", {
          name,
          date_of_birth: formattedBirthDate,
          email,
          telephone: phone,
          cpf,
          plan_id: Number(plan),
          health_notes: health,
          status: true,
          gender: gen,
        });
        toast.success("Aluno criado com sucesso!");
      }

      setName("");
      setBirthDate("");
      setCpf("");
      setGen("");
      setPlan("");
      setPhone("");
      setEmail("");
      setHealth("");

      setSelectedStudent(null);

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
            Gênero*
            <select required value={gen} onChange={(e) => setGen(e.target.value)}>
              <option value="">Selecione</option>
              <option value="O">Prefiro não informar</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
            </select>
          </label>
          <label>
            Status
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              disabled={!selectedStudent} 
            >
              <option value="true">Ativo</option>
              <option value="false">Inativo</option>
            </select>
          </label>
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
