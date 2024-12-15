import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import api from '../../api.js';
import { toast } from 'react-toastify';

import Button from '../Button/Button.jsx';
import InputField from '../InputField/InputField.jsx';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem('email') || sessionStorage.getItem('email');
    if (savedEmail) {
      setEmail(savedEmail); // Preenche o campo de e-mail
      setRememberMe(true); // Marca o checkbox "Lembre-se de mim"
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o reload da página

    try {
      const response = await api.post('/login', { email, password });
      const { token } = response.data;

      if (rememberMe) {
        localStorage.setItem('token', token);
        localStorage.setItem('email', email);
      } else {
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
      }

      toast.success('Login realizado com sucesso!', { position: 'top-right' });
      navigate('/AdminHome');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Falha no login. Verifique suas credenciais.';
      toast.error(errorMessage, { position: 'top-right' });
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <InputField
        type="email"
        id="email"
        placeholder="Digite seu email"
        label="Email*"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required // HTML5 validação
      />

      <InputField
        type="password"
        id="password"
        placeholder="Digite sua senha"
        label="Senha*"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required // HTML5 validação
      />

      <div className="form-options">
        <div className="remember-me">
          <input
            type="checkbox"
            id="remember"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="remember">Lembre de mim</label>
        </div>
        <Link to="#" className="forgot-password">Esqueceu a senha?</Link>
      </div>

      <Button type="submit">Entrar</Button>

      <div className="register-link">
        Não possui cadastro? <Link to="SignUp">Registre-se</Link>
      </div>
    </form>
  );
}

export default LoginForm;
