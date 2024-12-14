import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"

import SignUpPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import AdminHome from './pages/Admin/Home/AdminHome'
import Students from "./pages/Students/Students"
import AdminWarnings from "./pages/Admin/Warnings/AdminWarnings";
import AdminPlans from "./pages/Admin/Plans/AdminPlans";
import AdminPayments from "./pages/Admin/Payments/AdminPayments";
import AdminInstructors from "./pages/Admin/Instructors/AdminInstructors";
import Settings from "./pages/Settings/Settings";

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/adminhome" element={<AdminHome />} />
            <Route path="/students" element={<Students />} />
            <Route path="/adminwarnings" element={<AdminWarnings />} />
            <Route path="/adminplans" element={<AdminPlans />} />
            <Route path="/adminpayments" element={<AdminPayments />} />
            <Route path="/admininstructors" element={<AdminInstructors />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
