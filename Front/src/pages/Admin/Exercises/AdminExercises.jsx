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
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "all",
    sortBy: "name",
    sortOrder: "asc",
    itemsPerPage: 5,
  });

  const fetchExercises = async () => {
    try {
      const response = await api.get("/exercises", {
        params: {
          search: filters.searchTerm,
          filterBy: filters.filterBy !== "all" ? filters.filterBy : undefined,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          limit: filters.itemsPerPage,
        },
      });
      setExercises(response.data);
    } catch (error) {
      console.error("Erro ao buscar os exercícios:", error);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [filters]);

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
          <button onClick={handleOpenModal} className="btn add-exercise-form">
            Adicionar Exercício
          </button>
        </header>

        <ExercisesTable
          exercises={exercises}
          onExerciseDeleted={fetchExercises}
          setSelectedExercise={handleEditExercise}
          selectedExercise={selectedExercise}
          filters={filters}
          setFilters={setFilters}
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
