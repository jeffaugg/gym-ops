import React from "react";
import "./StudentsForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";


export default function StudentsForm() {
    return (
        <div className="students-form">
            <form>
            <div className="form-group">
              <InputFieldForm label="Nome*" type="text" placeholder="Digite o nome" required />
              <InputFieldForm label="Data de nascimento*" type="date" placeholder="" required />
            </div>

            <div className="form-group">
              <InputFieldForm label={"CPF*"} type={"text"} placeholder={"Digite o CPF"} required />
              <label>
                Gênero*
                <select required>
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </label>
            </div>

            <div className="form-group">
              <label>
                Planos*
                <select required>
                  <option value="">Selecione</option>
                  <option value="mensal">Mensal</option>
                  <option value="anual">Anual</option>
                </select>
              </label>
              <InputFieldForm label={"Telefone*"} type={"text"} placeholder={"Digite o telefone"} required />
            </div>

            <div className="form-group">
              <InputFieldForm label={"Email*"} type={"email"} placeholder={"Digite o email"} required />
              <InputFieldForm label={"Observações de saúde*"} type={"text"} placeholder={"Digite as observações"} required />

            </div>

            <div className="form-actions">
              <ButtonCancel />
              <ButtonSend />
            </div>
            </form>
        </div>
        
    );
}