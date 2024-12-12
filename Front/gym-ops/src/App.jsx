import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"

import Home from './pages/LoginPage/LoginPage.jsx'

function App() {

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  )
}

export default App
