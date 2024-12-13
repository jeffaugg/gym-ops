import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"

import SignupPage from './pages/SignupPage/SignupPage'
import LoginPage from './pages/LoginPage/LoginPage'
import AdminHome from './pages/Admin/Home/AdminHome'
// import Sidebar from "./components/Admin/Sidebar/Sidebar";
// import Students from "./pages/Students";
// import Messages from "./pages/Messages";
// import Plans from "./pages/Plans";
// import Payments from "./pages/Payments";
// import Instructors from "./pages/Instructors";
// import Settings from "./pages/Settings";
// import Logout from "./pages/Logout";

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/" element={<SignupPage />} />
            <Route path="/" element={<LoginPage />} />
            <Route path="/AdminHome" element={<AdminHome />} />
            {/* <Route path="/students" element={<Students />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/plans" element={<Plans />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/instructors" element={<Instructors />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/logout" element={<Logout />} /> */}
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
