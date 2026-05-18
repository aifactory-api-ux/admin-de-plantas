import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { RegistroDePlanta } from './pages/RegistroDePlanta';
import { DetalleDePlanta } from './pages/DetalleDePlanta';
import { tokens } from './styles/tokens';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('/dashboard');
  };

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handlePlantClick = (id: number) => {
    navigate(`/plantas/${id}`);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ fontFamily: tokens.typography.font_family, color: tokens.colors.text_primary }}>
      <Routes>
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route
          path="/dashboard"
          element={<Dashboard onNavigate={handleNavigate} onPlantClick={handlePlantClick} />}
        />
        <Route
          path="/registro"
          element={<RegistroDePlanta onNavigate={handleNavigate} />}
        />
        <Route
          path="/plantas/:id"
          element={<DetalleDePlanta onNavigate={handleNavigate} />}
        />
        <Route path="*" element={<Dashboard onNavigate={handleNavigate} onPlantClick={handlePlantClick} />} />
      </Routes>
    </div>
  );
}