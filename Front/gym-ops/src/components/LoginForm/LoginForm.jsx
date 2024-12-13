import React from 'react';
import { Link } from 'react-router-dom';
import './LoginForm.css';

import Button from '../Button/Button.jsx';
import InputField from '../InputField/InputField.jsx';

function LoginForm() {
  return (
    <form className="login-form">
      <InputField 
        type="email" 
        id="email" 
        placeholder="Digite seu email" 
        label="Email*" 
      />

      <InputField 
        type="password" 
        id="password" 
        placeholder="Digite sua senha" 
        label="Senha*" 
      />

      <div className="form-options">
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Lembre de mim</label>
        </div>
        <Link to="#" className="forgot-password">Esqueceu a senha?</Link>
      </div>

      <Button type="submit" navigateTo="/AdminHome">Entrar</Button>

      <div className="register-link">
        Não possui cadastro? <Link to="#">Registre-se</Link>
      </div>
      
    </form>
  );
}

export default LoginForm;
