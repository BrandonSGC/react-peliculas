import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const data = {
      username: username,
      password: password
    };

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Usuario y/o contraseña incorrectos');
        throw new Error('Error en la autenticación');
      }
    })
    .then(data => {
      if (data && data.token) {
        const token = data.token;

        console.log('Token de acceso:', token);

        localStorage.setItem('token', token);

        navigate('/');
      } else {
        console.error('Token no encontrado en la respuesta');
      }
    })
    .catch(error => {
      console.error('Error en la solicitud POST', error);
    });
  };

  return (
    <div className="login-container">
      <h1 className="text-center">Login</h1>
      <div className="search">
        <input
          type="text"
          className="search__input"
          placeholder="Nombre de Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="search">
        <input
          type="password"
          className="search__input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="search">
        <button className="search__button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
