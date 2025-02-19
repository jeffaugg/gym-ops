import React, { useEffect, useState } from "react";
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
          selectedStudent={selectedStudent}
          filters={filters}
          setFilters={setFilters}
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
