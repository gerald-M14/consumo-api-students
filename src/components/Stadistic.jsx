import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Stadistic = () => {
  const [estadisticas, setEstadisticas] = useState({ porDia: 0, porSemana: 0, porMes: 0 });

  // Usa directamente el token fijo
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/v1/students', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const data = response.data;
        const now = new Date();

        let porDia = 0;
        let porSemana = 0;
        let porMes = 0;

        data.forEach(est => {
          const fecha = new Date(est.created_at);
          const diferencia = (now - fecha) / (1000 * 60 * 60 * 24);

          if (diferencia <= 1) porDia++;
          if (diferencia <= 7) porSemana++;
          if (diferencia <= 30) porMes++;
        });

        setEstadisticas({ porDia, porSemana, porMes });
      } catch (error) {
        console.error('❌ Error al obtener estudiantes:', error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 w-full max-w-6xl">
  <div className="flex items-center p-4 bg-white rounded">
    <div className="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded">
      <svg className="w-6 h-6 fill-current text-green-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="flex-grow flex flex-col ml-4">
      <span className="text-xl font-bold">{estadisticas.porDia}</span>
      <span className="text-gray-500">Registrados hoy</span>
    </div>
  </div>

  <div className="flex items-center p-4 bg-white rounded">
    <div className="flex flex-shrink-0 items-center justify-center bg-yellow-200 h-16 w-16 rounded">
      <svg className="w-6 h-6 fill-current text-yellow-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="flex-grow flex flex-col ml-4">
      <span className="text-xl font-bold">{estadisticas.porSemana}</span>
      <span className="text-gray-500">Registrados últimos 7 días</span>
    </div>
  </div>

  <div className="flex items-center p-4 bg-white rounded">
    <div className="flex flex-shrink-0 items-center justify-center bg-blue-200 h-16 w-16 rounded">
      <svg className="w-6 h-6 fill-current text-blue-700" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
      </svg>
    </div>
    <div className="flex-grow flex flex-col ml-4">
      <span className="text-xl font-bold">{estadisticas.porMes}</span>
      <span className="text-gray-500">Registrados últimos 30 días</span>
    </div>
  </div>
</div>

  );
};

export default Stadistic;