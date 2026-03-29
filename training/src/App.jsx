import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import TrainingManagement from './pages/TrainingManagement';
import StudentManagement from './pages/StudentManagement';
import CheckinRecords from './pages/CheckinRecords';
import TrainingReports from './pages/TrainingReports';
import SystemSettings from './pages/SystemSettings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (username, password) => {
    // 模拟登录验证
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/training" 
          element={isAuthenticated ? <TrainingManagement onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/students" 
          element={isAuthenticated ? <StudentManagement onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/checkin" 
          element={isAuthenticated ? <CheckinRecords onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/reports" 
          element={isAuthenticated ? <TrainingReports onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/settings" 
          element={isAuthenticated ? <SystemSettings onLogout={handleLogout} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;