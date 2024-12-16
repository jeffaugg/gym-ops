import React from "react";
import "./Students.css";
import StudentsForm from "../../components/Admin/StudentsForm/StudentsForm";
import StudentsTable from "../../components/StudentsTable/StudentsTable";
import Layout from "../../components/LayoutPages/Layout";
import { useState, useEffect } from "react";
import api from "../../api";

function Students() {
  const [students, setStudents] = useState([]); // Estado para armazenar os planos

  // Função para buscar os planos
  const fetchStudents = async () => {
    try {
      const response = await api.get("/clients");
      const sortedStudents = response.data.sort((a, b) => b.id - a.id);
      setStudents(sortedStudents);
    } catch (error) {
      console.error("Erro ao buscar os alunos:", error);
      toast.error("Erro ao buscar os alunos.");
    }
  };

  // Carrega os alunos ao montar o componente
  useEffect(() => {
    fetchStudents();
  }, []);


  return (
    <Layout>
      <div className="students-content">
        <header className="students-header">
          <h1>Cadastrar aluno</h1>
        </header>
        <StudentsForm  onStudentCreated={fetchStudents}/>
        <StudentsTable students={students} onPlanDeleted={fetchStudents}/>
      </div>
    </Layout>
  );
}

export default Students;
