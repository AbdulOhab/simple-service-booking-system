import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import HomePage from './pages/HomePage';
import CustomerDashboard from './pages/CustomerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        // react Router render components
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* <Route path="/customer/dashboard" element={<CustomerDashboard />} /> */}
        {/* <Route path="/admin/dashboard" element={<AdminDashboard />} /> */}
        <Route path="/admin/dashboard" element={<ProtectedRoute> <AdminDashboard /> </ProtectedRoute>} />
        <Route path="/customer/dashboard" element={<ProtectedRoute> <CustomerDashboard /> </ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App
