import React from "react";
import "./Students.css";
import StudentsForm from "../../components/Admin/StudentsForm/StudentsForm";
import StudentsTable from "../../components/StudentsTable/StudentsTable";
import Layout from "../../components/LayoutPages/Layout";

function Students() {
  return (
    <Layout>
      <div className="students-content">
        <header className="students-header">
          <h1>Cadastrar aluno</h1>
        </header>
        <StudentsForm />
        <StudentsTable />
      </div>
    </Layout>
  );
}

export default Students;
