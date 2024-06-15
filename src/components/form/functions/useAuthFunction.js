import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../api/axios';
import { useNavigate } from 'react-router-dom';

const useAuthFunction = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (email, password, setUser) => {
    try {
      const response = await axiosInstance.post('/api/v1/auth/authenticate', {
        email: email.toLowerCase(),
        password: password
      });

      if (response.status === 200) {
        const token = response.data.token;
        const user = jwtDecode(token); // Decodificar token
        setUser(user);

        // Enviar alerta de inicio de sesión
        alert('Inicio de sesión exitoso');

        // Redireccionar al usuario al home
        navigate('/');
      } else {
        setError('Unexpected response from server');
      }
    } catch (error) {
      // Manejar errores de solicitud
      setError('Login failed. Please check your credentials.');
    }
  };

  return { handleSubmit, error };
};

export default useAuthFunction;
