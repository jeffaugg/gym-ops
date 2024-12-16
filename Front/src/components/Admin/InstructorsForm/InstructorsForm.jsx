import React, { useState, useEffect } from "react";
import "./InstructorsForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";

export default function InstructorsForm() {
  // const [name, setName] = useState("");
  // const [birthDate, setBirthDate] = useState("");
  // const [cpf, setCpf] = useState("");
  // const [gen, setGen] = useState("");
  // const [plan, setPlan] = useState("");
  // const [phone, setPhone] = useState("");
  // const [email, setEmail] = useState("");
  // const [health, setHealth] = useState("");
  // const [plans, setPlans] = useState([]);

  // // Fetch available plans
  // useEffect(() => {
  //   const fetchPlans = async () => {
  //     try {
  //       const response = await api.get("/plan");
  //       setPlans(response.data);
  //     } catch (error) {
  //       console.error("Erro ao buscar os planos:", error);
  //     }
  //   };

  //   fetchPlans();
  // }, []);

  // // Preenche o formulário quando `selectedInstructor` mudar
  // useEffect(() => {
  //   if (selectedInstructor) {
  //     setName(selectedInstructor.name || "");
  //     setBirthDate(selectedInstructor.date_of_birth || "");
  //     setCpf(selectedInstructor.cpf || "");
  //     setGen(selectedInstructor.gender || "");
  //     setPlan(selectedInstructor.plan_id || "");
  //     setPhone(selectedInstructor.telephone || "");
  //     setEmail(selectedInstructor.email || "");
  //     setHealth(selectedInstructor.health_notes || "");
  //   } else {
  //     // Limpa o formulário se nenhum estudante estiver selecionado
  //     setName("");
  //     setBirthDate("");
  //     setCpf("");
  //     setGen("");
  //     setPlan("");
  //     setPhone("");
  //     setEmail("");
  //     setHealth("");
  //   }
  // }, [selectedInstructor]);

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   try {
  //     if (selectedInstructor) {
  //       // Atualiza o estudante existente
  //       await api.put(`/clients/${selectedInstructor.id}`, {
  //         name,
  //         date_of_birth: birthDate,
  //         email,
  //         telephone: phone,
  //         cpf,
  //         plan_id: Number(plan),
  //         health_notes: health,
  //       });
  //       toast.success("Aluno atualizado com sucesso!");
  //     } else {
  //       // Cria um novo estudante
  //       await api.post("/clients", {
  //         name,
  //         date_of_birth: birthDate,
  //         email,
  //         telephone: phone,
  //         cpf,
  //         plan_id: Number(plan),
  //         health_notes: health,
  //       });
  //       toast.success("Aluno criado com sucesso!");
  //     }

  //     // Limpa o formulário
  //     setName("");
  //     setBirthDate("");
  //     setCpf("");
  //     setGen("");
  //     setPlan("");
  //     setPhone("");
  //     setEmail("");
  //     setHealth("");

  //     // Reseta o estudante selecionado
  //     setSelectedInstructor(null);

  //     // Atualiza a lista de estudantes
  //     onInstructorCreated();
  //   } catch (error) {
  //     console.error("Erro ao salvar o aluno:", error);
  //     toast.error("Erro ao salvar o aluno.");
  //   }
  // };

  return (
    <div className="instructors-form">
      <form>
        <div className="form-group">
          <InputFieldForm
            label="Nome*"
            type="text"
            placeholder="Digite o nome"
            // value={name}
            // onChange={(e) => setName(e.target.value)}
          />
          <InputFieldForm
            label="Data de nascimento*"
            type="date"
            placeholder=""
            // value={birthDate}
            // onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <InputFieldForm
            label="CPF*"
            type="text"
            placeholder="CPF no formato XXX.XXX.XXX-XX"
            // value={cpf}
            // onChange={(e) => setCpf(e.target.value)}
          />
          <label>
            Gênero*
            <select required >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="outro">Outro</option>
            </select>
          </label>
          <InputFieldForm
              label="CREF*"
              type="text"
              placeholder=""
              // value={cref}
              // onChange={(e) => setCref(e.target.value)}
            />
        </div>

        <div className="form-group">
          <InputFieldForm
              label="Email*"
              type="email"
              placeholder="Digite o email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
            />
          <InputFieldForm
            label="Telefone*"
            type="text"
            placeholder="(XX) XXXXX-XXXX"
            // value={phone}
            // onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
              Turno*
              <select required >
                <option value="">Selecione</option>
                <option value="masculino">Manhã</option>
                <option value="feminino">Tarde</option>
                <option value="outro">Noite</option>
              </select>
            </label>
          <InputFieldForm
            label="Senha"
            type="password"
            placeholder="Digite sua senha"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
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
