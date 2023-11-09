import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const IngresarUsuario = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombreUsuario,
          nombre,
          apellidos,
          email,
          contrasena,
        }),
      });

      if (response.ok) {
        alert("Usuario creado con éxito");
        // Puedes redirigir o realizar otras acciones después de crear el usuario con éxito
      } else {
        alert(`Ha ocurrido un error intente de nuevo`);
        // Manejar el error según tus necesidades
      }
    } catch (error) {
      console.error('Ha ocurrido un error intente de nuevo');
    }
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <h1 className="text-center">Ingresar Nuevo Usuario</h1>
      <div className="form-group">
        <label>Nombre de Usuario:</label>
        <input
          className="input_ingresar"
          type="text"
          value={nombreUsuario}
          onChange={(e) => setNombreUsuario(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Nombre:</label>
        <input
          className="input_ingresar"
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Apellidos:</label>
        <input
          className="input_ingresar"
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          className="input_ingresar"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label>Contraseña:</label>
        <input
          className="input_ingresar"
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
        />
      </div>
      <div className="form-group">
        <button className="create-user-button" onClick={handleCreateUser}>
          Crear Usuario
        </button>
        <button className="create-user-button" onClick={handleGoBack}>
          Regresar
        </button>
      </div>
    </div>
  );
};
