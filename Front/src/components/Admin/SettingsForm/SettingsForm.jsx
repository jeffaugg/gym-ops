import React, { useState, useEffect } from "react";
import "./SettingsForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";


export default function SettingsForm() {
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  useEffect(() => {
    const userData =
      JSON.parse(localStorage.getItem("user")) ||
      JSON.parse(sessionStorage.getItem("user"));

    if (userData) {
      setName(userData.name || "");
      setCpf(userData.cpf || "");
      setEmail(userData.email || "");
      setPhone(userData.tel || "");
    }
  }, []);


  const handleCancel = () => {
    setName("");
    setCpf("");
    setEmail("");
    setPhone("");
    setPassword("");
    setPasswordConfirmation("");
    toast.info("Mensagem cancelada.");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      toast.error("As senhas não coincidem. Por favor, verifique e tente novamente.");
      return; // Interrompe o envio
    }

    try {
      await api.put("/user", {
        name,
        email,
        password,
        cpf,
        tel: phone,
        role: "ADM",
      });

      toast.success("Administrador atualizado com sucesso!");

      // Limpa os campos após o envio bem-sucedido
      setName("");
      setCpf("");
      setEmail("");
      setPhone("");
      setPassword("");
      setPasswordConfirmation("");
    } catch (error) {
      console.error("Erro ao atualizar o administrador:", error);
      toast.error("Erro ao atualizar o administrador. Verifique o console.");
    }
  }
  return (
    <div className="settings-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputFieldForm
            label="Nome"
            type="text"
            placeholder="Nome do Administrator"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputFieldForm
            label="CPF"
            type="text"
            placeholder="XXX-XXX-XXX-XX"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask="999.999.999-99"
          />
        </div>
        <div className="form-group">
          <InputFieldForm
            label="Email"
            type="email"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputFieldForm
            label="Telefone"
            type="text"
            placeholder="(XX) XXXXX-XXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            mask="(99) 99999-9999"
          />
        </div>


        <div className="form-group">
          <InputFieldForm
            label="Senha"
            type="password"
            placeholder="Digite a sua nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputFieldForm
            label="Digite a senha novamente"
            type="password"
            placeholder="Digite a sua nova senha novamente"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <ButtonCancel onClick={handleCancel} />
          <ButtonSend />
        </div>
      </form>
    </div>
  );
}
