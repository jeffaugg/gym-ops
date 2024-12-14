import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import "./Students.css";
import StudentsForm from "../../components/Admin/StudentsForm/StudentsForm";
import StudentsTable from "../../components/StudentsTable/StudentsTable";

function Students() {
  return (
    <div className="students">
      <Sidebar />
      <div className="students-content">
        <Topbar />
        <header className="students-header">
          <h1>Alunos matriculados</h1>
        </header>

        <StudentsForm />
        <StudentsTable />

  
      </div>
    </div>
      // {/* <div className="main-content">
      //   <div className="content-container">
      //     <header className="header"> */}

  );
}

export default Students;
