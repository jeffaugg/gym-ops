import React, { useEffect, useState } from "react";
import "./PhysicalAssessment.css";
import Layout from "../../../components/Instructor/LayoutPages/Layout";
import PhysicalAssessmentForm from "../../../components/Instructor/PhysicalAssessmentForm/PhysicalAssessmentForm";
import PhysicalAssessmentTable from "../../../components/Instructor/PhysicalAssessmentTable/PhysicalAssessmentTable";
import api from "../../../api";
import { toast } from "react-toastify";

function PhysicalAssessment() {
  const [physicalAssessments, setPhysicalAssessments] = useState([]);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const fetchPhysicalAssessments = async () => {
    try {
      const response = await api.get("/reviews");
      const sortedAssessments = response.data.sort((a, b) => b.id - a.id);
      setPhysicalAssessments(sortedAssessments);
    } catch (error) {
      console.error("Erro ao buscar as avaliações físicas:", error);
      toast.error("Erro ao buscar as avaliações físicas.");
    }
  };

  useEffect(() => {
    fetchPhysicalAssessments();
  }, []);

  return (
    <Layout>
      <div className="assessments-content">
        <header className="assessments-header">
          <h1>Avaliações Físicas</h1>
        </header>

        <PhysicalAssessmentForm
          onPhysicalAssessmentCreated={fetchPhysicalAssessments}
          selectedAssessment={selectedAssessment}          
          setSelectedAssessment={setSelectedAssessment}     
        />

        <PhysicalAssessmentTable
          physicalAssessments={physicalAssessments}
          onPhysicalAssessmentDeleted={fetchPhysicalAssessments}
          setSelectedAssessment={setSelectedAssessment}      
        />
      </div>
    </Layout>
  );
}

export default PhysicalAssessment;
