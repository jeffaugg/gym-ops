import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Students.css";

function Students() {
  return (
    <div className="students">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="content-container">
          <header className="header">
            <h1>Alunos matriculados</h1>
          </header>
        </div>
      </div>
    </div>
  );
}

export default Students;
