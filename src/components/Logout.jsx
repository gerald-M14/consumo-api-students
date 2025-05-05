// LogoutButton.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Logout = () => {
    const navigate = useNavigate();

    const logout = async () => {
      try {
          const token = sessionStorage.getItem('token');
          console.log('Token enviado:', token);
  
          const response = await axios.post('http://127.0.0.1:8000/api/v1/logout', {}, {
              headers: {
                  Authorization: `Bearer ${token}`,
              },
          });
  
          console.log('Respuesta del servidor:', response);
          sessionStorage.removeItem('token');
          navigate('/login');
      } catch (error) {
          console.error('Error al cerrar sesión:', error.response ? error.response.data : error.message);
      }
  };
  

    return (
        <button
            onClick={logout}
            className="fixed top-4 right-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
        >
            Cerrar sesión
        </button>
    );
};

export default Logout;  // Asegúrate de usar `export default`
