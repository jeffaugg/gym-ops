import React, { useState, useEffect } from "react";
import "./PhysicalAssessmentForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";

export default function PhysicalAssessmentForm({
  onPhysicalAssessmentCreated,
  selectedAssessment,
  setSelectedAssessment,
}) {
  const [aluno, setAluno] = useState(null);
  const [cpf, setCpf] = useState("");

  // Campos de medidas
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

  // Se `selectedAssessment` mudar, vamos preencher o formulário
  useEffect(() => {
    if (selectedAssessment) {
      // Ajusta os campos com os dados da avaliação
      setHeight(selectedAssessment.height ?? "");
      setWeight(selectedAssessment.weight ?? "");
      setFatMass(selectedAssessment.fat_mass ?? "");
      setLeanMass(selectedAssessment.lean_mass ?? "");
      setLeftArmRelaxed(selectedAssessment.left_arm_relaxed ?? "");
      setRightArmRelaxed(selectedAssessment.right_arm_relaxed ?? "");
      setLeftArmContracted(selectedAssessment.left_arm_contracted ?? "");
      setRightArmContracted(selectedAssessment.right_arm_contracted ?? "");
      setLeftThigh(selectedAssessment.left_thigh ?? "");
      setRightThigh(selectedAssessment.right_thigh ?? "");
      setLeftCalf(selectedAssessment.left_calf ?? "");
      setRightCalf(selectedAssessment.right_calf ?? "");
      setChest(selectedAssessment.chest ?? "");
      setAbdomen(selectedAssessment.abdomen ?? "");
      setWaist(selectedAssessment.waist ?? "");
      setHip(selectedAssessment.hip ?? "");

      // Se o back-end retorna algo como `assessment.aluno_id`, 
      // então definimos o "aluno" para exibir o nome, etc.
      const alunoDoAssessment = selectedAssessment.aluno_id;
      if (alunoDoAssessment && alunoDoAssessment.id) {
        setAluno(alunoDoAssessment);
        setCpf(alunoDoAssessment.cpf || "");
      }
    } else {
      // Se não há avaliação selecionada, limpamos tudo (cadastro novo)
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
    }
  }, [selectedAssessment]);

  // Buscar Aluno por CPF (apenas se estivermos criando uma nova)
  const searchAluno = async () => {
    // Se estivermos editando, não faz sentido buscar outro aluno,
    // mas você pode permitir caso queira trocar o aluno da avaliação.
    // Aqui, vou permitir a busca sempre, mas você pode condicionar.
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

    // Se estamos criando E não temos aluno, exibir erro
    if (!selectedAssessment && (!aluno || !aluno.id)) {
      toast.error("Nenhum aluno foi encontrado. Busque um aluno antes de prosseguir.");
      return;
    }

    // Monta o objeto para enviar
    const dataToSend = {
      aluno_id: aluno?.id, // se estamos editando e não alteramos o aluno, permanece
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
    };

    try {
      if (selectedAssessment) {
        // Modo edição -> PUT
        await api.put(`/reviews/${selectedAssessment.id}`, dataToSend);
        toast.success("Avaliação atualizada com sucesso!");
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
        setHip(""); // Isso ativa o "else" do useEffect e limpa campos
        setSelectedAssessment(null); // Isso ativa o "else" do useEffect e limpa campos



      } else {
        // Modo criação -> POST
        await api.post("/reviews", dataToSend); // Isso ativa o "else" do useEffect e limpa campos
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
        setSelectedAssessment(null); // Isso ativa o "else" do useEffect e limpa campos


      }

      // Limpar estados
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
      setHip(""); // Isso ativa o "else" do useEffect e limpa campos
      setSelectedAssessment(null); // Isso ativa o "else" do useEffect e limpa campos

      onPhysicalAssessmentCreated();
    } catch (error) {
      console.error("Erro ao salvar a avaliação:", error);
      toast.error("Erro ao salvar a avaliação.");
    }
  };

  // Se quiser um botão de cancelar edição, limpando o formulário
  const handleCancel = () => {
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
    setSelectedAssessment(null); // Isso ativa o "else" do useEffect e limpa campos

  };

  return (
    <div className="assessment-form">
      <form onSubmit={handleSubmit}>
        {/* Se não tiver selectedAssessment, exibimos o campo de busca por CPF */}
        {!selectedAssessment && (
          <div className="form-group">
            <InputFieldForm
              label="CPF*"
              type="text"
              placeholder="CPF no formato XXX.XXX.XXX-XX"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              mask="999.999.999-99"
            />
            <button type="button" onClick={searchAluno} className="btn search">
              Buscar Aluno
            </button>
          </div>
        )}

        {aluno && !selectedAssessment && (
          <div>
            <p>
              <strong>Aluno encontrado:</strong> {aluno.name}
              <br />
            </p>
            <br />
          </div>
        )}

        {selectedAssessment && aluno && (
          <p>
            <strong>Editando avaliação do(a) aluno(a):</strong> {aluno.name}
            <br />
          </p>
        )}

        <div className="form-group">
          <InputFieldForm
            label="Peso* (kg)"
            type="number"
            placeholder="Ex: 70.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            title={"Peso"}
          />

          <InputFieldForm
            label="Altura* (cm)"
            type="number"
            placeholder="Ex: 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            title={"Altura"}
          />

          <InputFieldForm
            label="Massa Magra* (kg)"
            type="number"
            placeholder="Ex: 60"
            value={leanMass}
            onChange={(e) => setLeanMass(e.target.value)}
            title={"Massa Magra"}
          />

          <InputFieldForm
            label="Massa Gorda* (kg)"
            type="number"
            placeholder="Ex: 10"
            value={fatMass}
            onChange={(e) => setFatMass(e.target.value)}
            title={"Massa Gorda"}
          />
        </div>

        <div className="form-group">
          <InputFieldForm
            label="Braço esq. relaxado* (cm)"
            type="number"
            placeholder="Ex: 30"
            value={leftArmRelaxed}
            onChange={(e) => setLeftArmRelaxed(e.target.value)}
            title={"Braço esquerdo relaxado"}
          />

          <InputFieldForm
            label="Braço dir. relaxado* (cm)"
            type="number"
            placeholder="Ex: 31"
            value={rightArmRelaxed}
            onChange={(e) => setRightArmRelaxed(e.target.value)}
            title={"Braço direito relaxado"}
          />

          <InputFieldForm
            label="Braço esq. contraído* (cm)"
            type="number"
            placeholder="Ex: 32"
            value={leftArmContracted}
            onChange={(e) => setLeftArmContracted(e.target.value)}
            title={"Braço esquerdo contraído"}
          />

          <InputFieldForm
            label="Braço dir. contraído* (cm)"
            type="number"
            placeholder="Ex: 33"
            value={rightArmContracted}
            onChange={(e) => setRightArmContracted(e.target.value)}
            title={"Braço direito contraído"}
          />
        </div>

        <div className="form-group">
          <InputFieldForm
            label="Coxa esq.* (cm)"
            type="number"
            placeholder="Ex: 55"
            value={leftThigh}
            onChange={(e) => setLeftThigh(e.target.value)}
            title={"Coxa esquerda"}
          />

          <InputFieldForm
            label="Coxa dir.* (cm)"
            type="number"
            placeholder="Ex: 56"
            value={rightThigh}
            onChange={(e) => setRightThigh(e.target.value)}
            title={"Coxa direita"}
          />

          <InputFieldForm
            label="Panturrilha esq.* (cm)"
            type="number"
            placeholder="Ex: 35"
            value={leftCalf}
            onChange={(e) => setLeftCalf(e.target.value)}
            title={"Panturrilha esquerda"}
          />

          <InputFieldForm
            label="Panturrilha dir.* (cm)"
            type="number"
            placeholder="Ex: 36"
            value={rightCalf}
            onChange={(e) => setRightCalf(e.target.value)}
            title={"Panturrilha direita"}
          />
        </div>

        <div className="form-group">
          <InputFieldForm
            label="Peitoral* (cm)"
            type="number"
            placeholder="Ex: 90"
            value={chest}
            onChange={(e) => setChest(e.target.value)}
            title={"Peitoral"}
          />

          <InputFieldForm
            label="Abdomen* (cm)"
            type="number"
            placeholder="Ex: 85"
            value={abdomen}
            onChange={(e) => setAbdomen(e.target.value)}
            title={"Abdomen"}
          />

          <InputFieldForm
            label="Cintura* (cm)"
            type="number"
            placeholder="Ex: 80"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            title={"Cintura"}
          />

          <InputFieldForm
            label="Quadril* (cm)"
            type="number"
            placeholder="Ex: 100"
            value={hip}
            onChange={(e) => setHip(e.target.value)}
            title={"Quadril"}
          />
        </div>

        <div className="form-actions">
          {/* Botão Enviar */}
          <ButtonSend isEditing={!!selectedAssessment} />

          {/* Botão Cancelar */}
          {/* Ao cancelar, limpamos o selectedAssessment para voltar ao modo "criar" */}
          <ButtonCancel onClick={handleCancel} />
        </div>
      </form>
    </div>
  );
}
