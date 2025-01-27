import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import ExercisesForm from "../../../components/Admin/ExercisesForm/ExercisesForm";
import ExercisesTable from "../../../components/Admin/ExercisesTable/ExercisesTable";
import api from "../../../api";
import { toast } from "react-toastify";
import "./AdminExercises.css";

function AdminExercises() {
  const [exercises, setExercises] = useState([]); 
  const [selectedExercise, setSelectedExercise] = useState(null); 

  const fetchExercises = async () => {
    try {
      const response = await api.get("/exercises");
      const sortedExercises = response.data.sort((a, b) => b.id - a.id);
      setExercises(sortedExercises);
    } catch (error) {
      console.error("Erro ao buscar os exercícios:", error);
      toast.error("Erro ao buscar os exercícios.");
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <Layout>
      <div className="exercises-content">
        <header className="exercises-header">
          <h1>Exercícios</h1>
        </header>

        <ExercisesForm
          onExerciseCreated={fetchExercises}
          selectedExercise={selectedExercise}
          setSelectedExercise={setSelectedExercise}
        />

        <ExercisesTable
          exercises={exercises}
          onExerciseDeleted={fetchExercises}
          setSelectedExercise={setSelectedExercise}
          selectedExercise={selectedExercise}
        />
      </div>
    </Layout>
  );
}

export default AdminExercises;
