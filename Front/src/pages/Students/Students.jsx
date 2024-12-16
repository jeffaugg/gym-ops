import React, { useState, useEffect } from "react";
import "./Students.css";
import StudentsForm from "../../components/Admin/StudentsForm/StudentsForm";
import StudentsTable from "../../components/StudentsTable/StudentsTable";
import Layout from "../../components/LayoutPages/Layout";
import api from "../../api";

function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const fetchStudents = async () => {
    try {
      const response = await api.get("/clients");
      const sortedStudents = response.data.sort((a, b) => b.id - a.id);
      setStudents(sortedStudents);
    } catch (error) {
      console.error("Erro ao buscar os alunos:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <Layout>
      <div className="students-content">
        <header className="students-header">
          <h1>Cadastrar aluno</h1>
        </header>
        <StudentsForm
          onStudentCreated={fetchStudents}
          selectedStudent={selectedStudent}
          setSelectedStudent={setSelectedStudent}
        />
        <StudentsTable
          students={students}
          onPlanDeleted={fetchStudents}
          setSelectedStudent={setSelectedStudent}
        />
      </div>
    </Layout>
  );
}

export default Students;
