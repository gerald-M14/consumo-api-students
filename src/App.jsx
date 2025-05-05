import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './components/login'; 
import Logout from './components/logout'; 
import GetStudents from './components/getStudents'; 
import AddStudents from './components/AddStudents';
import SearchByID from './components/SearchByID'; // Crea este componente

function App() {
  const isAuthenticated = !!sessionStorage.getItem('token');

  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route
          path="/students"
          element={isAuthenticated ? <GetStudents /> : <Navigate to="/login" />}
        />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/students" : "/login"} />} />
        <Route path="*" element={<Navigate to={isAuthenticated ? "/students" : "/login"} />} />

        <Route path="/add-student" element={<AddStudents />} />
        <Route path="/search-id" element={<SearchByID />} />
      </Routes>
    </Router>
  );
}

export default App;
