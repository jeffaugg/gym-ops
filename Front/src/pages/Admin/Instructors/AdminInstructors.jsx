import React, { useState, useEffect } from "react";
import "./AdminInstructors.css";
import api from "../../../api";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import InstructorsForm from "../../../components/Admin/InstructorsForm/InstructorsForm";
import InstructorsTable from "../../../components/Admin/InstructorsTable/InstructorsTable";
import Modal from "../../../components/Modal/Modal"; 

function AdminInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  const fetchInstructors = async () => {
    try {
      const response = await api.get("/user/allusers");
      const sortedInstructors = response.data.sort((a, b) => b.id - a.id);
      setInstructors(sortedInstructors);
    } catch (error) {
      console.error("Erro ao buscar os instrutores:", error);
    }
  };

  useEffect(() => {
    fetchInstructors();
  }, []);

  const handleOpenModal = () => {
    setSelectedInstructor(null); 
    setIsModalOpen(true);
  };

  const handleEditInstructor = (instructor) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInstructor(null);
  };

  return (
    <Layout>
      <div className="instructors-content">
        <header className="instructors-header">
          <h1>Instrutores</h1>
          <button onClick={handleOpenModal} className="btn add-instructor">
             Adicionar Instrutor
          </button>
        </header>

        <InstructorsTable
          instructors={instructors}
          onPlanDeleted={fetchInstructors}
          setSelectedInstructor={handleEditInstructor}
          selectedInstructor={selectedInstructor}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <InstructorsForm
            onInstructorCreated={() => {
              fetchInstructors();
              handleCloseModal();
            }}
            selectedInstructor={selectedInstructor}
            setSelectedInstructor={setSelectedInstructor}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminInstructors;
