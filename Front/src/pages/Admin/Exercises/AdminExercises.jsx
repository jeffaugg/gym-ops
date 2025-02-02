import React, { useState, useEffect } from "react";
import Layout from "../../../components/Admin/LayoutPages/Layout";
import ExercisesForm from "../../../components/Admin/ExercisesForm/ExercisesForm";
import ExercisesTable from "../../../components/Admin/ExercisesTable/ExercisesTable";
import Modal from "../../../components/Modal/Modal"; 
import api from "../../../api";
import { toast } from "react-toastify";
import "./AdminExercises.css";

function AdminExercises() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
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

  const handleOpenModal = () => {
    setSelectedExercise(null); 
    setIsModalOpen(true);
  };

  const handleEditExercise = (exercise) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExercise(null);
  };

  return (
    <Layout>
      <div className="exercises-content">
        <header className="exercises-header">
          <h1>Exercícios</h1>
          <button onClick={handleOpenModal} className="btn add-exercise">
            Adicionar Exercício
          </button>
        </header>

        <ExercisesTable
          exercises={exercises}
          onExerciseDeleted={fetchExercises}
          setSelectedExercise={handleEditExercise}
          selectedExercise={selectedExercise}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ExercisesForm
            onExerciseCreated={() => {
              fetchExercises();
              handleCloseModal();
            }}
            selectedExercise={selectedExercise}
            setSelectedExercise={setSelectedExercise}
          />
        </Modal>
      </div>
    </Layout>
  );
}

export default AdminExercises;
