import React, { useState, useEffect } from "react";
import "./InstructorsForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";

export default function InstructorsForm({ onInstructorCreated, selectedInstructor, setSelectedInstructor }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [tel, setTel] = useState("");
  const [role] = useState("USER");
  const [date_of_birth, setBirthDate] = useState("");
  const [gender, setGen] = useState("");
  const [cref, setCref] = useState("");
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const [turnTime, setTurnTime] = useState("");

  const handleDaysChange = (day) => {
    const dayNumber = Number(day);
    setDaysOfWeek((prev) =>
      prev.includes(dayNumber) ? prev.filter((d) => d !== dayNumber) : [...prev, dayNumber]
    );
  };

  useEffect(() => {
    if (selectedInstructor) {
      setName(selectedInstructor.name || "");
      setBirthDate(selectedInstructor.date_of_birth || "");
      setCpf(selectedInstructor.cpf || "");
      setGen(selectedInstructor.gender || "");
      setTel(selectedInstructor.tel || "");
      setEmail(selectedInstructor.email || "");
      setCref(selectedInstructor.cref || "");
      setDaysOfWeek(selectedInstructor.daysofweek || []);
      setTurnTime(selectedInstructor.turntime || "");
    } else {
      setName("");
      setBirthDate("");
      setCpf("");
      setGen("");
      setTel("");
      setEmail("");
      setCref("");
      setDaysOfWeek([]);
      setTurnTime("");
      setPassword("");
    }
  }, [selectedInstructor]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await api.post("/user/signupuser", {
        name,
        email,
        password,
        cpf,
        tel,
        role,
        date_of_birth,
        gender,
        cref,
        daysofweek: daysOfWeek,
        turntime: turnTime,
      });

      toast.success("Criação de Instrutor realizado com sucesso!", { position: "top-right" });
      onInstructorCreated();
    } catch (error) {
      const errors = error.response?.data?.message;

      if (error.response?.status === 409) {
        toast.error("Usuário já cadastrado. Por favor, verifique suas credenciais.", {
          position: "top-right",
        });
        return;
      }

      if (Array.isArray(errors)) {
        errors.forEach((err) => {
          toast.error(err.message, {
            position: "top-right",
            autoClose: 5000,
          });
        });
      } else {
        toast.error("Falha na criação. Verifique as informações.", { position: "top-right" });
        console.log("falha",error)
      }
    }
  };

  return (
    <div className="instructors-form">
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
            value={date_of_birth}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <InputFieldForm
            label="CPF*"
            type="text"
            placeholder="XXX.XXX.XXX-XX"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask={"999.999.999-99"}
          />
          <label>
            Gênero*
            <select value={gender} onChange={(e) => setGen(e.target.value)} required>
              <option value="">Selecione</option>
              <option value="M">Masculino</option>
              <option value="F">Feminino</option>
              <option value="O">Outro</option>
            </select>
          </label>
          <InputFieldForm
            label="CREF*"
            type="text"
            placeholder="12345-G/CE"
            value={cref}
            onChange={(e) => setCref(e.target.value)}
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
            label="Senha*"
            type="password"
            placeholder="Digite sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>
            Dias da Semana*
            <div className="dias-container">
              {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                <label key={day}>
                  <input
                    type="checkbox"
                    name="dias"
                    value={day}
                    checked={daysOfWeek.includes(day)}
                    onChange={() => handleDaysChange(day)}
                  />
                  {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][day - 1]}
                </label>
              ))}
            </div>
          </label>
          <label>
            Turno*
            <select value={turnTime} onChange={(e) => setTurnTime(Number(e.target.value))} required>
              <option value="">Selecione</option>
              <option value={1}>Manhã</option>
              <option value={2}>Tarde</option>
              <option value={3}>Noite</option>
            </select>
          </label>
          <InputFieldForm
            label="Telefone*"
            type="text"
            placeholder="(XX) XXXXX-XXXX"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            mask={"(99) 99999-9999"}
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
