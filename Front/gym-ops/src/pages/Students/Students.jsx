import React from "react";
import Sidebar from "../../components/Admin/Sidebar/Sidebar";
import "./Students.css";
import StudentsForm from "../../components/Admin/StudentsForm/StudentsForm";
import StudentsTable from "../../components/StudentsTable/StudentsTable";

function Students() {
  return (
    <div className="students">
      <Sidebar />
      <div className="students-content">
        <header className="students-header">
          <h1>Alunos</h1>
        </header>

        <StudentsForm />
        <StudentsTable />

  
      </div>
    </div>
  );
}

export default Students;
