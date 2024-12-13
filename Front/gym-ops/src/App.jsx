import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"

import LoginPage from './pages/LoginPage/LoginPage.jsx'
import SignupPage from './pages/SignupPage/SignupPage.jsx'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {/* <Route path="/" element={<LoginPage />} /> */}
            <Route path="/" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
