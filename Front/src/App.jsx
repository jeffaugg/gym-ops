import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignUpPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AdminHome from './pages/Admin/Home/AdminHome';
import AdminStudents from "./pages/Admin/Students/Students";
import AdminWarnings from "./pages/Admin/Warnings/AdminWarnings";
import AdminPlans from "./pages/Admin/Plans/AdminPlans";
import AdminPayments from "./pages/Admin/Payments/AdminPayments";
import AdminInstructors from "./pages/Admin/Instructors/AdminInstructors";
import Settings from "./pages/Settings/Settings";
import InstructorHome from './pages/Instructor/Home/InstructorHome';
import InstructorStudents from "./pages/Instructor/Students/Students";
import PhysicalAssessment from './pages/Instructor/PhysicalAssessment/PhysicalAssessment';
import PresencePage from "./pages/Presence/PresencePage" 

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Rotas protegidas */}
        {/* ADM */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/warnings"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminWarnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/plans"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminPlans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/payments"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/instructors"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminInstructors />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute roles={["USER"]}>
              <Settings />
            </ProtectedRoute>
          }
        />
        {/* USER */}
        <Route
          path="/instructor"
          element={
            <ProtectedRoute roles={["USER"]}>
              <InstructorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/students"
          element={
            <ProtectedRoute roles={["USER"]}>
              <InstructorStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/PhysicalAssessment"
          element={
            <ProtectedRoute roles={["USER"]}>
              <PhysicalAssessment />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructor/presence"
          element={
            <ProtectedRoute roles={["USER"]}>
              <PresencePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;