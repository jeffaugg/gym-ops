import React from 'react';
import './LoginPage.css';
import LoginForm from '../../components/LoginForm/LoginForm.jsx';

import gymLogo from '../../assets/logo.png'; 

function LoginPage() {
  return (
    <div className="login-page-container">
      <div className="login-form-section">
        <h2>Entre agora</h2>
        <LoginForm />
      </div>
      <div className="login-image-section">
        <img src={gymLogo} alt="Gym Ops Logo" />
      </div>
    </div>
  );
}

export default LoginPage;
