import { useState } from 'react';

const AddStudents = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validaciones
    if (password.length < 8) {
        setError('La contraseña debe tener al menos 8 caracteres');
        setSuccess('');
        return;
    }

    const phoneRegex = /^[0-9]{7,15}$/; // Puedes ajustar el rango si necesitas más precisión
    if (!phoneRegex.test(phoneNumber)) {
        setError('El número de teléfono no es válido. Solo se permiten números (7 a 15 dígitos)');
        setSuccess('');
        return;
    }

    const newStudent = {
      firstName,
      lastName,
      age,
      grade,
      email,
      phone_number: phoneNumber,
      password,
    };

    try {
      const response = await fetch('/api/v1/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      });

      const result = await response.json();
console.log(result); // ✅ Imprime la respuesta completa del backend

    if (response.status === 201 || response.ok) {
        setSuccess('Estudiante agregado exitosamente');
        setError('');
        setFirstName('');
        setLastName('');
        setAge('');
        setGrade('');
        setEmail('');
        setPhoneNumber('');
        setPassword('');
    } else {
        setError('Hubo un error al agregar el estudiante');
        setSuccess('');
      }
    } catch (error) {
      setError('Hubo un error al comunicarse con el servidor');
      setSuccess('');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-center text-cyan-700">Agregar Estudiante</h1>
      
      {/* Mostrar mensaje de error o éxito */}
      {error && <p className="text-red-600 text-center">{error}</p>}
      {success && <p className="text-green-600 text-center">{success}</p>}

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-6">
        <div className="mb-4">
          <label className="block text-lg font-medium text-cyan-700" htmlFor="firstName">
            Nombre:
          </label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-cyan-700" htmlFor="lastName">
            Apellido:
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-cyan-700" htmlFor="age">
            Edad:
          </label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-cyan-700" htmlFor="grade">
            Grado:
          </label>
          <input
            type="number"
            id="grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-cyan-700" htmlFor="email">
            Correo:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-cyan-700" htmlFor="phoneNumber">
            Número de Teléfono:
          </label>
          <input
            type="text"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-cyan-700" htmlFor="phoneNumber">
            Contraseña:
          </label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-cyan-600 text-white rounded-lg px-6 py-3 w-full font-bold hover:bg-cyan-700 transition"
        >
          Agregar Estudiante
        </button>
      </form>
    </div>
  );
};

export default AddStudents;
