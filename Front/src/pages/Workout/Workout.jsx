import React, { useState, useEffect } from "react";
import Layout from "../../components/Admin/LayoutPages/Layout";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import WorkoutTable from "../../components/WorkoutTable/WorkoutTable";
import Modal from "../../components/Modal/Modal";
import api from "../../api";
import { toast } from "react-toastify";
import "./Workout.css";

function Workout() {
    const [workouts, setWorkouts] = useState([]);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchWorkouts = async () => {
        try {
            const response = await api.get("/workouts");
            const sortedWorkouts = response.data.sort((a, b) => b.id - a.id);
            setWorkouts(sortedWorkouts);
        } catch (error) {
            console.error("Erro ao buscar os treinos:", error);
            toast.error("Erro ao buscar os treinos.");
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleOpenModal = () => {
        setSelectedWorkout(null); // Reseta o formulário
        setIsModalOpen(true);
    };

    const handleEditWorkout = (workout) => {
        setSelectedWorkout(workout);
        setIsModalOpen(true); // Abre o modal para edição
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWorkout(null);
    };

    return (
        <Layout>
            <div className="workout-content">
                <header className="workout-header">
                    <h1>Treinos</h1>
                    <button onClick={handleOpenModal} className="btn add-workout">
                        Adicionar Treino
                    </button>
                </header>

                <WorkoutTable
                    workouts={workouts}
                    onWorkoutDeleted={fetchWorkouts}
                    setSelectedWorkout={handleEditWorkout}
                    selectedWorkout={selectedWorkout}
                />

                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <WorkoutForm
                        onWorkoutCreated={fetchWorkouts} 
                        selectedWorkout={selectedWorkout}
                        setSelectedWorkout={setSelectedWorkout}
                        onCloseModal={handleCloseModal}
                    />
                </Modal>
            </div>
        </Layout>
    );
}

export default Workout;
