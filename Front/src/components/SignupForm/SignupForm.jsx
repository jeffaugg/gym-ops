import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./SignupForm.css";

import Button from "../Button/Button.jsx";
import InputField from "../InputField/InputField.jsx";
import api from '../../api.js';
import { toast } from 'react-toastify'; 

function SignupForm() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');
  const [tel, setTel] = useState('');
  const [role, setRole] = useState('ADM');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {

    if (!acceptTerms) {
      toast.error('Você deve aceitar os termos para continuar.', {
        position: 'top-right',
      });
      return;
    }

    try {
      const response = await api.post('/user/signup', { name, email, password, cpf, tel, role });

      toast.success('Criação de usuário ADM realizado com sucesso!', {
        position: 'top-right', 
      });

      navigate('/');

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
    }

  };

  return (
    <form className="signup-form" onSubmit={handleSubmit}>
      <InputField
        type="string"
        id="name"
        placeholder="Digite seu nome"
        label="Nome*"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <InputField
        type="text"
        id="cpf"
        placeholder="XXX.XXX.XXX-XX"
        label="CPF*"
        value={cpf}
        onChange={(e) => setCpf(e.target.value)}
        mask="999.999.999-99"
      />

      <InputField
        type="text"
        id="telefone"
        placeholder="(XX) XXXXX-XXXX"
        label="Telefone*"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
        mask="(99) 99999-9999"
      />

      <InputField
        type="email"
        id="email"
        placeholder="Digite seu email"
        label="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputField
        type="password"
        id="password"
        placeholder="Digite sua senha"
        label="Senha*"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="form-options">
        <div className="accept-terms">
          <input
            type="checkbox"
            id="accept"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
          />
          <label htmlFor="accept">Aceito os termos de serviço</label>
        </div>
      </div>

      <Button type="submit">Registrar</Button>

      <div className="register-link">
        Já possui cadastro? <Link to="/">Entre aqui!</Link>
      </div>
    </form>
  );
}

export default SignupForm;
