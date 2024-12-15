import React, { useState } from 'react';
import "./PlansForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";

import api from "../../../api.js";
import { toast } from 'react-toastify'; // Importa o Toastify

export default function PlansForm() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [vacancies, setVacancies] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post("/plan", {
                name,
                price: Number(price),
                duration: Number(duration),
              });
          
              // Exibe mensagem de sucesso
              toast.success("Plano criado com sucesso!");
          
              // Limpa o formulário
              setName("");
              setPrice("");
              setDuration("");
        } catch (error) {
            // Trata erros
            console.error("Erro ao criar o plano:", error);
            toast.error(error.response?.data?.message || "Erro ao criar o plano.");
        }
    };


    return (
        <div className="plans-form">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <InputFieldForm label={"Nome do plano*"} type={"text"} placeholder={"Digite o nome do plano"} value={name} onChange={(e) => setName(e.target.value)} />
                    <InputFieldForm label={"Valor*"} type={"number"} placeholder={"Digite o valor"} value={price} onChange={(e) => setPrice(e.target.value)} />
                </div>
                <div className="form-group">
                    <InputFieldForm label={"Duração*"} type={"number"} placeholder={"Digite a duração"} value={duration} onChange={(e) => setDuration(e.target.value)} />
                    {/* <InputFieldForm label={"Quantidade de vagas*"} type={"number"} placeholder={"Digite a quantidade de vagas"} /> */}
                </div>

                <div className="form-actions">
                    <ButtonCancel />
                    <ButtonSend />
                </div>
            </form>
        </div>
    );
}