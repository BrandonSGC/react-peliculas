import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckTokenExpiration from '../auth/CheckTokenExpiration';
import { UserContext } from '../context/UserContext';

const Login = () => {

  const { setUser } = useContext(UserContext);


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
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            if (data && data.token) {
                const token = data.token;

                // Almacena el token en el localStorage
                localStorage.setItem('token', token);

                // Imprime el token en la consola
                console.log('Token de acceso:', token);

                // Decodificar el token para obtener la información si es necesario
                const decodedToken = parseJwt(token);

                if (decodedToken && decodedToken.exp) {
                    // Almacena el tiempo de expiración en el almacenamiento local
                    localStorage.setItem('tokenExpiration', decodedToken.exp * 1000); // Multiplica por 1000 para convertir a milisegundos
                }

                setUser(username);
       
            navigate('/recentmovies', { state: { checkToken: true } });
            } else {
                console.error('Token no encontrado en la respuesta');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud POST', error);

            if (error.message.includes('inactivo')) {
                alert('Usuario inactivo. Contacta al soporte.');
            } else if (error.message.includes('intentos fallidos')) {
                alert('Has alcanzado tres intentos fallidos. Usuario inactivo.');
            } else {
                alert('Usuario y/o contraseña incorrectos');
            }
        });
};

  // Función para decodificar un token JWT
  const parseJwt = token => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = JSON.parse(atob(base64));
      return jsonPayload;
    } catch (e) {
      return null;
    }
  };

  // Función para verificar la expiración del token
  const isTokenExpired = () => {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    if (tokenExpiration && new Date().getTime() / 1000 > tokenExpiration) {
      // Token expirado, realizar las acciones necesarias (por ejemplo, redirigir al inicio de sesión)
      return true;
    }
    return false;
  };

  // Verificar la expiración del token al cargar el componente
  useEffect(() => {
    if (isTokenExpired()) {
      // Realizar las acciones necesarias (por ejemplo, redirigir al inicio de sesión)
      navigate('/');
    }
  }, [navigate]);

  return (
    <div className="login-container">
      <h1 className="text-center">Login</h1>
      <div className="search">
        <input
          type="text"
          className="input_login"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="search">
        <input
          type="password"
          className="input_login"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="search">
        <button className="search__button" onClick={handleLogin}>
          Login
        </button>
        <CheckTokenExpiration />
      </div>
    </div>
  );
};

export default Login;
