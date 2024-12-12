import React from 'react';

function LoginForm() {
  return (
    <form className="login-form">
      <div className="form-group">
        <label htmlFor="email">Email*</label>
        <input type="email" id="email" placeholder="Digite seu email" />
      </div>
      <div className="form-group">
        <label htmlFor="password">Senha*</label>
        <input type="password" id="password" placeholder="Digite sua senha" />
      </div>
      <div className="form-options">
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Lembre de mim</label>
        </div>
        <a href="#" className="forgot-password">Esqueceu a senha?</a>
      </div>
      <button type="submit" className="login-button">Logar</button>
      <div className="register-link">
        Não possui cadastro? <a href="#">Registre-se</a>
      </div>
    </form>
  );
}

export default LoginForm;
