import React from "react";
import "./PlansForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";

export default function PlansForm() {
    return (
        <div className="plans-form">
            <form>
                <div className="form-group">
                    <InputFieldForm label={"Nome do plano*"} type={"text"} placeholder={"Digite o nome do plano"} />
                    <InputFieldForm label={"Valor*"} type={"number"} placeholder={"Digite o valor"} />
                </div>
                <div className="form-group">
                    <InputFieldForm label={"Duração*"} type={"number"} placeholder={"Digite a duração"} />
                    <InputFieldForm label={"Quantidade de vagas*"} type={"number"} placeholder={"Digite a quantidade de vagas"} />
                </div>

                <div className="form-actions">
                    <ButtonCancel />
                    <ButtonSend />
                </div>
            </form>
        </div>
    );
}