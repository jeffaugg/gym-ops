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
    const savedRememberMe = localStorage.getItem('rememberMe') === 'true';

    if (savedEmail) {
      setEmail(savedEmail); 
      setRememberMe(savedRememberMe); 
    } else {
      setRememberMe(false); 
    }
  }, []); 

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await api.post('/user/login', { email, password });
      console.log('Resposta da API:', response.data);
      const { token, user } = response.data;
      
      console.log(rememberMe)
      if (rememberMe) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("email", email);
        localStorage.setItem("rememberMe", "true");
        console.log('Token salvo:', localStorage.getItem('token') || sessionStorage.getItem('token'));
        console.log('Usuário salvo:', JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')));

      } else {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("email", email);
        localStorage.removeItem("rememberMe");
        console.log('Token salvo:', localStorage.getItem('token') || sessionStorage.getItem('token'));
        console.log('Usuário salvo:', JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user')));
      }


      toast.success('Login realizado com sucesso!', {
        position: 'top-right', 
      });

      if (user.role === "ADM") {
        navigate('/AdminHome');
      } else if (user.role === "USER") {
        navigate('/InstructorHome');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log('Erro ao fazer login:', error);
      toast.error('Falha no login. Verifique suas credenciais.', {
        position: 'top-right',
      });

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