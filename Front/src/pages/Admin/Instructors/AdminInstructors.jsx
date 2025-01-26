import React, { useState, useEffect } from "react";
import "./AdminInstructors.css";
import api from "../../../api";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import InstructorsForm from "../../../components/Admin/InstructorsForm/InstructorsForm";
import InstructorsTable from "../../../components/Admin/InstructorsTable/InstructorsTable";

function AdminInstructors() {
  const [instructors, setInstructors] = useState([]);
  const [selectedInstructor, setSelectedInstructor] = useState(null);

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

  return (
    <Layout>
    <div className="instructors-content">
      <header className="instructors-header">
        <h1>Instrutores</h1>
      </header>
      <InstructorsForm
        onInstructorCreated={fetchInstructors}
        selectedInstructor={selectedInstructor}
        setSelectedInstructor={setSelectedInstructor}
      />
      <InstructorsTable
        instructors={instructors}
        onPlanDeleted={fetchInstructors}
        setSelectedInstructor={setSelectedInstructor}
        selectedInstructor={selectedInstructor}
      />
    </div>
  </Layout>
  );
}

export default AdminInstructors;
