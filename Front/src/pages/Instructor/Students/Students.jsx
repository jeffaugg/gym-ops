import React, { useState, useEffect } from "react";
import "./Students.css";
import StudentsForm from "../../../components/Instructor/StudentDetails/StudentDetails";
import StudentsTable from "../../../components/Instructor/StudentsTable/StudentsTable";
import Layout from "../../../components/Instructor/LayoutPages/Layout";
import Modal from "../../../components/Modal/Modal";
import api from "../../../api";

function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);

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

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewOnly(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    setIsViewOnly(false);
  };

  return (
    <Layout>
      <div className="students-content">
        <header className="students-header">
          <h1>Alunos</h1>
        </header>
        <StudentsTable
          students={students}
          setSelectedStudent={handleViewStudent}
        />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <StudentsForm
            selectedStudent={selectedStudent}
            isViewOnly={isViewOnly}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default Students;