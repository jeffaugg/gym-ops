import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginForm.css';
import api from '../../api.js';
import { toast } from 'react-toastify'; // Importa o Toastify


import Button from '../Button/Button.jsx';
import InputField from '../InputField/InputField.jsx';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o reload da página

    try {
      // Faz a requisição para o back-end
      const response = await api.post('/login', { email, password });
      const { token } = response.data;

      // No handleSubmit do LoginForm
      localStorage.setItem('token', token); // Salva o token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Salva o objeto do usuário


      toast.success('Login realizado com sucesso!', {
        position: 'top-right', // Posição do toast
      });

      // Redireciona o usuário para a página de admin
      navigate('/AdminHome');
    } catch (error) {
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
          <input type="checkbox" id="remember" />
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


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './LoginForm.css';
// import Button from '../Button/Button.jsx';
// import InputField from '../InputField/InputField.jsx';
// import api from '../../api'; // Importa o Axios configurado

// export default function LoginForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (event) => {
//     event.preventDefault(); // Evita o reload da página

//     try {
//       // Faz a requisição para o back-end
//       const response = await api.post('/login', { email, password });
//       const { token } = response.data;

//       // Armazena o token no Local Storage
//       localStorage.setItem('token', token);

//       // Redireciona o usuário para a página de admin
//       navigate('/AdminHome');
//     } catch (error) {
//       console.error('Erro ao fazer login:', error.response?.data?.message || error.message);
//       alert('Falha no login. Verifique suas credenciais.');
//     }
//   };

//   return (
//     <form className="login-form" onSubmit={handleSubmit}>
//       <InputField
//         type="email"
//         id="email"
//         placeholder="Digite seu email"
//         label="Email*"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <InputField
//         type="password"
//         id="password"
//         placeholder="Digite sua senha"
//         label="Senha*"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <div className="form-options">
//         <div className="remember-me">
//           <input type="checkbox" id="remember" />
//           <label htmlFor="remember">Lembre de mim</label>
//         </div>
//         <Link to="#" className="forgot-password">Esqueceu a senha?</Link>
//       </div>

//       <Button type="submit">Entrar</Button>

//       <div className="register-link">
//         Não possui cadastro? <Link to="SignUp">Registre-se</Link>
//       </div>
//     </form>
//   );
// }