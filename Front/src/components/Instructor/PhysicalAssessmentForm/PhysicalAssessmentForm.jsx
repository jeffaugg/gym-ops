import React, { useState, useEffect } from "react";
import "./PhysicalAssessmentForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";

export default function PayForm({ onPaymentCreated }) {
  const [aluno, setAluno] = useState(null);
  const [cpf, setCpf] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fatMass, setFatMass] = useState("");
  const [leanMass, setLeanMass] = useState("");
  const [leftArmRelaxed, setLeftArmRelaxed] = useState("");
  const [rightArmRelaxed, setRightArmRelaxed] = useState("");
  const [leftArmContracted, setLeftArmContracted] = useState("");
  const [rightArmContracted, setRightArmContracted] = useState("");
  const [leftThigh, setLeftThigh] = useState("");
  const [rightThigh, setRightThigh] = useState("");
  const [leftCalf, setLeftCalf] = useState("");
  const [rightCalf, setRightCalf] = useState("");
  const [chest, setChest] = useState("");
  const [abdomen, setAbdomen] = useState("");
  const [waist, setWaist] = useState("");
  const [hip, setHip] = useState("");

  const searchAluno = async (event) => {
    event.preventDefault();
    try {
      const response = await api.get(`/clients/cpf/${cpf}`);
      setAluno(response.data);
      toast.success("Aluno encontrado com sucesso!");
    } catch (error) {
      console.error("Erro ao buscar o aluno:", error);
      setAluno(null);
      toast.error("Erro ao buscar o aluno.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!aluno || !aluno.id) {
      toast.error("Nenhum aluno foi encontrado. Busque um aluno antes de prosseguir.");
      return;
    }

    try {

      console.log(aluno.id, height, weight, fatMass, leanMass, leftArmRelaxed, rightArmRelaxed, leftArmContracted, rightArmContracted, leftThigh, rightThigh, leftCalf, rightCalf, chest, abdomen, waist, hip);

      const response = await api.post("/reviews", {
        aluno_id: aluno.id,
        height: Number(height),
        weight: Number(weight),
        fat_mass: Number(fatMass),
        lean_mass: Number(leanMass),
        left_arm_relaxed: Number(leftArmRelaxed),
        right_arm_relaxed: Number(rightArmRelaxed),
        left_arm_contracted: Number(leftArmContracted),
        right_arm_contracted: Number(rightArmContracted),
        left_thigh: Number(leftThigh),
        right_thigh: Number(rightThigh),
        left_calf: Number(leftCalf),
        right_calf: Number(rightCalf),
        chest: Number(chest),
        abdomen: Number(abdomen),
        waist: Number(waist),
        hip: Number(hip),
        photo: [],
      });

      toast.success("Avaliação cadastrada com sucesso!");

      setAluno(null);
      setCpf("");
      setHeight("");
      setWeight("");
      setFatMass("");
      setLeanMass("");
      setLeftArmRelaxed("");
      setRightArmRelaxed("");
      setLeftArmContracted("");
      setRightArmContracted("");
      setLeftThigh("");
      setRightThigh("");
      setLeftCalf("");
      setRightCalf("");
      setChest("");
      setAbdomen("");
      setWaist("");
      setHip("");

      // onPaymentCreated();
    } catch (error) {
      console.error("Erro ao efetuar o pagamento:", error);
      toast.error("Erro ao efetuar o pagamento.");
    }
  };

  return (
    <div className="pay-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <InputFieldForm
            label="CPF*"
            type="text"
            placeholder="CPF no formato XXX.XXX.XXX-XX"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            mask={"999.999.999-99"}
          />
          <button type="button" onClick={searchAluno} className="btn search">
            Buscar Aluno
          </button>
        </div>

        {aluno && (
          <div>
            <p><strong>Aluno encontrado:</strong> {aluno.name}</p>
            <br />
          </div>
        )}

        <div className="form-group">

          <InputFieldForm
            label="Peso*"
            type="number"
            placeholder="Peso em gramas"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />

          <InputFieldForm
            label="Altura*"
            type="number"
            placeholder="Altura em cm"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          <InputFieldForm
            label="Massa magra*"
            type="number"
            placeholder="Massa em gramas"
            value={leanMass}
            onChange={(e) => setLeanMass(e.target.value)}
          />


          <InputFieldForm
            label="Massa gorda*"
            type="number"
            placeholder="Massa em gramas"
            value={fatMass}
            onChange={(e) => setFatMass(e.target.value)}
          />

        </div>

        <div className="form-group">

          <InputFieldForm
            label="Braço esq. relaxado*"
            type="number"
            placeholder="Circ. em cm"
            value={leftArmRelaxed}
            onChange={(e) => setLeftArmRelaxed(e.target.value)}
          />

          <InputFieldForm
            label="Braço dir. relaxado*"
            type="number"
            placeholder="Circ. em cm"
            value={rightArmRelaxed}
            onChange={(e) => setRightArmRelaxed(e.target.value)}
          />

          <InputFieldForm
            label="Braço esq. contraido*"
            type="number"
            placeholder="Circ. em cm"
            value={leftArmContracted}
            onChange={(e) => setLeftArmContracted(e.target.value)}
          />

          <InputFieldForm
            label="Braço dir. contraido"
            type="number"
            placeholder="Circ. em cm"
            value={rightArmContracted}
            onChange={(e) => setRightArmContracted(e.target.value)}
          />

        </div>

        <div className="form-group">

          <InputFieldForm
            label="Circ. coxa esq.*"
            type="number"
            placeholder="Circ. em cm"
            value={leftThigh}
            onChange={(e) => setLeftThigh(e.target.value)}
          />

          <InputFieldForm
            label="Circ. coxa dir.*"
            type="number"
            placeholder="Circ. em cm"
            value={rightThigh}
            onChange={(e) => setRightThigh(e.target.value)}
          />

          <InputFieldForm
            label="Circ. pant. esq.*"
            type="number"
            placeholder="Circ. em cm"
            value={leftCalf}
            onChange={(e) => setLeftCalf(e.target.value)}
          />

          <InputFieldForm
            label="Circ. pant. dir.*"
            type="number"
            placeholder="Circ. em cm"
            value={rightCalf}
            onChange={(e) => setRightCalf(e.target.value)}
          />

        </div>

        <div className="form-group">

          <InputFieldForm
            label="Peitoral*"
            type="number"
            placeholder="Circ. em cm"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
          />

          <InputFieldForm
            label="Abdomen*"
            type="number"
            placeholder="Circ. em cm"
            value={abdomen}
            onChange={(e) => setAbdomen(e.target.value)}
          />

          <InputFieldForm
            label="Cintura*"
            type="number"
            placeholder="Circ. em cm"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
          />

          <InputFieldForm
            label="Quadril*"
            type="number"
            placeholder="Circ. em cm"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
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
