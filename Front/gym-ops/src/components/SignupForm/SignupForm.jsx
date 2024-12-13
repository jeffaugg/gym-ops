import React from "react";

import "./SignupForm.css";

import Button from "../Button/Button.jsx";
import InputField from "../InputField/InputField.jsx";

function SignupForm() {
  return (
    <form className="signup-form">
      <InputField
        type="string"
        id="name"
        placeholder="Digite seu nome"
        label="Nome*"
      />

      <InputField
        type="string"
        id="cpf"
        placeholder="Digite seu cpf: XXXXXXXXXXX"
        label="CPF*"
      />

      <InputField
        type="email"
        id="email"
        placeholder="Digite seu email"
        label="Email*"
      />

      <InputField
        type="password"
        id="password"
        placeholder="Digite sua senha"
        label="Senha*"
      />

      <InputField
        type="password"
        id="password"
        placeholder="Digite sua senha novamente"
        label="Senha*"
      />

      <div className="form-options">
        <div className="accept-terms">
          <input type="checkbox" id="accept" />
          <label htmlFor="accept">Aceito os termos</label>
        </div>
      </div>

      <Button type="submit">Registrar</Button>

      <div className="register-link">
        Já possui cadastro? <a href="#">Entre aqui!</a>
      </div>
    </form>
  );
}

export default SignupForm;
