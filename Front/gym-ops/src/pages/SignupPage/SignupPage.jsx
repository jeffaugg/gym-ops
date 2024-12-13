import React from 'react';
import './SignupPage.css';
import SignupForm from '../../components/SignupForm/SignupForm.jsx';

import gymLogo from '../../assets/logo.png'; 

function LoginPage() {
  return (
    <div className="sign-page-container">
      <div className="sign-form-section">
        <h2>Registre-se</h2>
        <SignupForm />
      </div>
      <div className="sign-image-section">
        <img src={gymLogo} alt="Gym Ops Logo" />
      </div>
    </div>
  );
}

export default LoginPage;
