import React from 'react';

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
        <a href="#" className="forgot-password">Esqueceu a senha?</a>
      </div>

      <Button type="submit">Entrar</Button>

      <div className="register-link">
        Não possui cadastro? <a href="#">Registre-se</a>
      </div>
      
    </form>
  );
}

export default LoginForm;
