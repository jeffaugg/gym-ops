import React from "react";
import "./AdminInstructors.css";
import Layout from "../../../components/LayoutPages/Layout";
import InstructorsForm from "../../../components/Admin/InstructorsForm/InstructorsForm";
import InstructorsTable from "../../../components/Admin/InstructorsTable/InstructorsTable";

function AdminInstructors() {
  return (
    <Layout>
    <div className="instructors-content">
      <header className="instructors-header">
        <h1>Instrutores</h1>
      </header>
      <InstructorsForm
        // onInstructorCreated={fetchInstructors}
        // selectedInstructor={selectedInstructor}
        // setSelectedInstructor={setSelectedInstructor}
      />
      <InstructorsTable
        // instructors={instructors}
        // onPlanDeleted={fetchInstructors}
        // setSelectedInstructor={setSelectedInstructor}
      />
    </div>
  </Layout>
  );
}

export default AdminInstructors;
