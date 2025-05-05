// login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://127.0.0.1:8000/api/v1/login', {
            email,
            password,
        });

        // Asegúrate de que la respuesta contenga el token
        console.log('Respuesta del servidor:', response);
        
        if (response.data && response.data.token) {
            const expirationTime = new Date().getTime() + 30 * 60 * 1000; // 30 minutos en milisegundos
            sessionStorage.setItem('token', response.data.token);
            sessionStorage.setItem('tokenExpiration', expirationTime.toString());

            // Verifica que el token y la expiración se han guardado correctamente
            console.log('Token guardado:', sessionStorage.getItem('token'));
            console.log('Expiración del token:', sessionStorage.getItem('tokenExpiration'));

            // Redirige al usuario después del login
            navigate('/students'); // Asegúrate de que esta ruta esté bien configurada
        } else {
            setError('Token no recibido del servidor.');
        }
    } catch (err) {
        setError('Credenciales incorrectas, por favor intente nuevamente.');
        console.error('Error al iniciar sesión:', err);
    }
};


  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      {/* Fondo de Imagen */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Fondo de imagen"
          className="w-full h-full object-cover filter blur-lg brightness-50"
        />
      </div>

      {/* Formulario de Login */}
      <div className="relative z-10 bg-white p-8 rounded-md shadow-lg">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="email"
              type="email"
              autocomplete="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full"
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between gap-8">
            <button
              className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-cyan-500 hover:text-cyan-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
