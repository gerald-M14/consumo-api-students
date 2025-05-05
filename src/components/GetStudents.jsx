import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Logout from "./logout"
import Stadistic from "./Stadistic"





function GetStudents() {
  const [students, setStudents] = useState([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("") 
  const [filteredStudents, setFilteredStudents] = useState([]) 
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const token = sessionStorage.getItem("token")
    if (token) {
      setIsLoading(true)
      axios
        .get("http://127.0.0.1:8000/api/v1/students", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setStudents(res.data)
          setFilteredStudents(res.data)
          setIsLoading(false)
        })
        .catch((err) => {
          setError("No se pudieron obtener los estudiantes.")
          console.error("Error al obtener estudiantes:", err)
          setIsLoading(false)
        })
    } else {
      setError("No estás autenticado.")
      setIsLoading(false)
    }
  }, [])

  const handleSearch = (query) => {
    if (query === "") {
      setFilteredStudents(students)
    } else {
      const lowercasedQuery = query.toLowerCase()
      setFilteredStudents(
        students.filter(
          (student) =>
            student.id.toString().includes(lowercasedQuery) ||
            student.firstName.toLowerCase().includes(lowercasedQuery) ||
            student.lastName.toLowerCase().includes(lowercasedQuery)
        )
      )
    }
  }

  const handleSearchInputChange = (event) => {
    const query = event.target.value
    setSearchQuery(query)
    handleSearch(query)
  }

  const handleEditStudent = (student) => {
    setCurrentStudent(student)
    setIsModalOpen(true)
  }

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("token")
    if (token) {
      axios
        .delete(`http://127.0.0.1:8000/api/v1/students/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setStudents(students.filter((student) => student.id !== id))
          setFilteredStudents(filteredStudents.filter((student) => student.id !== id))
          
        })
        .catch((err) => {
          console.error("Error al eliminar estudiante:", err)
        })
    }
  }


  const handleSaveEdit = () => {
    const token = sessionStorage.getItem("token")
    if (token) {
      axios
        .patch(`http://127.0.0.1:8000/api/v1/students/${currentStudent.id}`, currentStudent, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setStudents(students.map((student) => (student.id === currentStudent.id ? currentStudent : student)))
          setFilteredStudents(filteredStudents.map((student) => (student.id === currentStudent.id ? currentStudent : student)))
          setIsModalOpen(false)
        })
        .catch((err) => {
          console.error("Error al guardar cambios:", err)
        })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
        <Logout />
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2 tracking-tight">
            Sistema de Gestión Estudiantil
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Administra la información de estudiantes de manera eficiente y segura
          </p>
        </header>

        <div className="mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Buscar por ID o nombre"
            className="p-2 border border-slate-300 rounded-md w-full"
          />
          
        </div>
        <div className="mb-6">
        <Stadistic />
        </div>
        <div className="mb-6 text-right">
          <button
            onClick={() => navigate("/add-student")}
            className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600"
          >
            Agregar Estudiante
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100">
          <div className="p-6 border-b border-slate-100">
            <h2 className="text-xl font-semibold text-slate-800">Listado de Estudiantes</h2>
            <p className="text-slate-500 text-sm mt-1">{filteredStudents.length} estudiantes registrados</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <p className="text-rose-600 mb-2">{error}</p>
              <p className="text-slate-500 text-sm">Verifica tu conexión o inicia sesión nuevamente</p>
            </div>
          ) : filteredStudents.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 text-left text-slate-600 text-sm">
                    <th className="px-6 py-3 font-medium">ID</th>
                    <th className="px-6 py-3 font-medium">Nombre</th>
                    <th className="px-6 py-3 font-medium">Apellido</th>
                    <th className="px-6 py-3 font-medium">Edad</th>
                    <th className="px-6 py-3 font-medium">Grado</th>
                    <th className="px-6 py-3 font-medium">Correo</th>
                    <th className="px-6 py-3 font-medium">Teléfono</th>
                    <th className="px-6 py-3 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors text-sm">
                      <td className="px-6 py-4 font-medium text-slate-700">{student.id}</td>
                      <td className="px-6 py-4 text-slate-700">{student.firstName}</td>
                      <td className="px-6 py-4 text-slate-700">{student.lastName}</td>
                      <td className="px-6 py-4 text-slate-700">{student.age}</td>
                      <td className="px-6 py-4">{student.grade}</td>
                      <td className="px-6 py-4 text-slate-700">{student.email}</td>
                      <td className="px-6 py-4 text-slate-700">{student.phone_number}</td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={() => handleEditStudent(student)}
                          className="text-sm text-emerald-600 hover:underline"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleDelete(student.id)}
                          className="text-sm text-rose-600 hover:underline"
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <p className="text-slate-500">No hay estudiantes registrados.</p>
            </div>
          )}
        </div>

        {/* Modal de edición */}
        {isModalOpen && currentStudent && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-2xl font-semibold mb-4">Editar Estudiante</h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600">Nombre</label>
                <input
                  type="text"
                  className="p-2 border border-slate-300 rounded-md w-full"
                  value={currentStudent.firstName}
                  onChange={(e) =>
                    setCurrentStudent({ ...currentStudent, firstName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600">Apellido</label>
                <input
                  type="text"
                  className="p-2 border border-slate-300 rounded-md w-full"
                  value={currentStudent.lastName}
                  onChange={(e) =>
                    setCurrentStudent({ ...currentStudent, lastName: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600">Edad</label>
                <input
                  type="number"
                  className="p-2 border border-slate-300 rounded-md w-full"
                  value={currentStudent.age}
                  onChange={(e) =>
                    setCurrentStudent({ ...currentStudent, age: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600">Grado</label>
                <input
                  type="text"
                  className="p-2 border border-slate-300 rounded-md w-full"
                  value={currentStudent.grade}
                  onChange={(e) =>
                    setCurrentStudent({ ...currentStudent, grade: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600">Correo</label>
                <input
                  type="email"
                  className="p-2 border border-slate-300 rounded-md w-full"
                  value={currentStudent.email}
                  onChange={(e) =>
                    setCurrentStudent({ ...currentStudent, email: e.target.value })
                  }
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-600">Teléfono</label>
                <input
                  type="text"
                  className="p-2 border border-slate-300 rounded-md w-full"
                  value={currentStudent.phone_number}
                  onChange={(e) =>
                    setCurrentStudent({ ...currentStudent, phone_number: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-md"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md"
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default GetStudents
