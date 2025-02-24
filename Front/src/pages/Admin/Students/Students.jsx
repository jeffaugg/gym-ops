import React, { useState, useEffect } from "react";
import "./Students.css";
import StudentsForm from "../../../components/Admin/StudentsForm/StudentsForm";
import StudentsTable from "../../../components/Admin/StudentsTable/StudentsTable";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import Modal from "../../../components/Modal/Modal";
import api from "../../../api";

function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "all",
    sortBy: "name",
    sortOrder: "asc",
    itemsPerPage: 5,
  });

  const fetchStudents = async () => {
    try {
      const response = await api.get("/clients", {
        params: {
          search: filters.searchTerm,
          filterBy: filters.filterBy !== "all" ? filters.filterBy : undefined,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          limit: filters.itemsPerPage,
        },
      });
      setStudents(response.data);
    } catch (error) {
      console.error("Erro ao buscar os alunos:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [filters]);

  const handleOpenModal = () => {
    setSelectedStudent(null);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <Layout>
      <div className="students-content">
        <header className="students-header">
          <h1>Alunos</h1>
          <button onClick={handleOpenModal} className="btn add-student">
            Adicionar Aluno
          </button>
        </header>
        <StudentsTable
          students={students}
          onStudentDeleted={fetchStudents}
          setSelectedStudent={handleEditStudent}
          selectedStudent={selectedStudent}
          filters={filters}
          setFilters={setFilters}
        />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <StudentsForm
            onStudentCreated={() => {
              fetchStudents();
              handleCloseModal();
            }}
            selectedStudent={selectedStudent}
            setSelectedStudent={setSelectedStudent}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default Students;
