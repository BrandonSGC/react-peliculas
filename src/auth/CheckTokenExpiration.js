// CheckTokenExpiration.js
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CheckTokenExpiration = () => {
        const navigate = useNavigate();
        const [tokenExpired, setTokenExpired] = useState(false);
        const [timeRemaining, setTimeRemaining] = useState(null);

        useEffect(() => {
            const tokenExpiration = localStorage.getItem('tokenExpiration');

            if (tokenExpiration) {
                const expirationTime = parseFloat(tokenExpiration);

                if (!isNaN(expirationTime)) {
                    const currentTime = new Date().getTime();
                    const remainingTime = expirationTime - currentTime;

                    if (remainingTime > 0) {
                        if (remainingTime >= 60 * 1000) {
                            // Muestra el tiempo restante en minutos
                            setTimeRemaining(Math.ceil(remainingTime / (1000 * 60)));
                        } else {
                            // Muestra el tiempo restante en segundos si es inferior a un minuto
                            setTimeRemaining(Math.ceil(remainingTime / 1000));
                        }
                    } else {
                        // Token ha expirado, establecer el estado correspondiente
                        setTokenExpired(true);
                        // Redirige a la pantalla de inicio de sesión
                        navigate('/');
                    }
                }
            }
        }, [navigate]);

        useEffect(() => {
                    if (timeRemaining !== null) {
                        console.log(`Tiempo restante del token: ${`${timeRemaining} segundo(s)`}`);
    }
  }, [timeRemaining]);

  return tokenExpired;
};

export default CheckTokenExpiration;