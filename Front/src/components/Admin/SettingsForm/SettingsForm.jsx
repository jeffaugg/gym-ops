import React, { useState } from "react";
import "./SettingsForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";

export default function SettingsForm() {
  return (
    <div className="settings-form">
      <form >
        <div className="form-group">
          <InputFieldForm
            label="Nome"
            type="text"
            placeholder="Nome do Administrator"
          />
          <InputFieldForm
            label="CPF"
            type="text"
            placeholder="XXX-XXX-XXX-XX"
          />
        </div>
        <div className="form-group">
          <InputFieldForm
            label="Email"
            type="email"
            placeholder="email@example.com"
          />
          <InputFieldForm
            label="Telefone"
            type="text"
            placeholder="(XX) XXXXX-XXXX"
          />
        </div>


        <div className="form-group">
         <InputFieldForm
            label="Senha"
            type="text"
            placeholder="Digite a sua nova senha"
          />
          <InputFieldForm
            label="Digite a senha novamente"
            type="text"
            placeholder="Digite a sua nova senha novamente"
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
