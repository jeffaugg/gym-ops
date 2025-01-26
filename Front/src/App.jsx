// import './App.css'
// import React from 'react'
// import { BrowserRouter, Routes, Route} from "react-router-dom"

// import SignUpPage from './pages/SignupPage/SignupPage'
// import LoginPage from './pages/LoginPage/LoginPage'
// import AdminHome from './pages/Admin/Home/AdminHome'
// import Students from "./pages/Students/Students"
// import AdminWarnings from "./pages/Admin/Warnings/AdminWarnings";
// import AdminPlans from "./pages/Admin/Plans/AdminPlans";
// import AdminPayments from "./pages/Admin/Payments/AdminPayments";
// import AdminInstructors from "./pages/Admin/Instructors/AdminInstructors";
// import Settings from "./pages/Settings/Settings";

// function App() {

//   return (
//     <>
//       <div>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/" element={<LoginPage />} />
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path="/adminhome" element={<AdminHome />} />
//             <Route path="/students" element={<Students />} />
//             <Route path="/adminwarnings" element={<AdminWarnings />} />
//             <Route path="/adminplans" element={<AdminPlans />} />
//             <Route path="/adminpayments" element={<AdminPayments />} />
//             <Route path="/admininstructors" element={<AdminInstructors />} />
//             <Route path="/settings" element={<Settings />} />
//           </Routes>
//         </BrowserRouter>
        
//       </div>
//     </>
//   )
// }

// export default App

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
          path="/adminhome"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminstudents"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminwarnings"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminWarnings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminplans"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminPlans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/adminpayments"
          element={
            <ProtectedRoute roles={["ADM"]}>
              <AdminPayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admininstructors"
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
          path="/instructorhome"
          element={
            <ProtectedRoute roles={["USER"]}>
              <InstructorHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructorstudents"
          element={
            <ProtectedRoute roles={["USER"]}>
              <InstructorStudents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/instructorPhysicalAssessment"
          element={
            <ProtectedRoute roles={["USER"]}>
              <PhysicalAssessment />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;