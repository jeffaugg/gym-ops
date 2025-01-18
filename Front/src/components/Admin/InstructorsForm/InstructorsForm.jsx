import React, { useState, useEffect } from "react";
import "./InstructorsForm.css";
import InputFieldForm from "../../InputFieldForm/InputFieldForm";
import ButtonCancel from "../../ButtonCancel/ButtonCancel";
import ButtonSend from "../../ButtonSend/ButtonSend";
import api from "../../../api";
import { toast } from "react-toastify";

export default function InstructorsForm({ selectedInstructor, onInstructorCreated}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [tel, setTel] = useState('');
  const [role] = useState('USER');
  const [birthDate, setBirthDate] = useState("");
  const [gen, setGen] = useState("");

  // Preenche o formulário quando `selectedInstructor` mudar
  useEffect(() => {
    if (selectedInstructor) {
      setName(selectedInstructor.name || "");
      setBirthDate(selectedInstructor.date_of_birth || "");
      setCpf(selectedInstructor.cpf || "");
      setGen(selectedInstructor.gender || "");
      setTel(selectedInstructor.tel || "");
      setEmail(selectedInstructor.email || "");
    } else {
      // Limpa o formulário se nenhum instrutor estiver selecionado
      setName("");
      setBirthDate("");
      setCpf("");
      setGen("");
      setTel("");
      setEmail("");
    }
  }, [selectedInstructor]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/user/signup', { name, email, password, cpf, tel, role });

      toast.success('Criação de Instrutor realizado com sucesso!', {
        position: 'top-right', 
      });

    } catch (error) {
      console.log(error.response);

      const errors = error.response?.data?.message;

      if (error.response?.status === 409) {
        toast.error('Usuário já cadastrado. Por favor, verifique suas credenciais.', {
          position: 'top-right',
        });
        return;
      }

      if (Array.isArray(errors)) {
        
        errors.forEach((err) => {
          toast.error(err.message, {
            position: 'top-right',
            autoClose: 5000, 
          });
        });
      } else {
        toast.error('Falha na criação. Verifique as informações.', {
          position: 'top-right',
        });
      }

      // Limpa o formulário
      setName("");
      setBirthDate("");
      setCpf("");
      setGen("");
      setTel("");
      setEmail("");

      // Reseta o instrutor selecionado
      setSelectedInstructor(null);

      // Atualiza a lista de instrutors
      onInstructorCreated();
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
            placeholder=""
            // value={birthDate}
            // onChange={(e) => setBirthDate(e.target.value)}
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
              placeholder="Digite o CREF"
              // value={cref}
              // onChange={(e) => setCref(e.target.value)}
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
              <label>
                <input type="checkbox" name="dias" value={1} />
                Dom
              </label>
              <label>
                <input type="checkbox" name="dias" value={2} />
                Seg
              </label>
              <label>
                <input type="checkbox" name="dias" value={3} />
                Ter
              </label>
              <label>
                <input type="checkbox" name="dias" value={4} />
                Qua
              </label>
              <label>
                <input type="checkbox" name="dias" value={5} />
                Qui
              </label>
              <label>
                <input type="checkbox" name="dias" value={6} />
                Sex
              </label>
              <label>
                <input type="checkbox" name="dias" value={7} />
                Sáb
              </label>
            </div>
          </label>
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
