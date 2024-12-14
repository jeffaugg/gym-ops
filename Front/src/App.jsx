import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminHome from './pages/Admin/Home/AdminHome';
import Students from "./pages/Students/Students";
import AdminWarnings from "./pages/Admin/Warnings/AdminWarnings";
import AdminPlans from "./pages/Admin/Plans/AdminPlans";
import AdminPayments from "./pages/Admin/Payments/AdminPayments";
import AdminInstructors from "./pages/Admin/Instructors/AdminInstructors";
import Settings from "./pages/Settings/Settings";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Importa o ProtectedRoute

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Rotas protegidas */}
        <Route
          path="/adminhome"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminwarnings"
          element={
            <ProtectedRoute>
              <AdminWarnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminplans"
          element={
            <ProtectedRoute>
              <AdminPlans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminpayments"
          element={
            <ProtectedRoute>
              <AdminPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admininstructors"
          element={
            <ProtectedRoute>
              <AdminInstructors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
