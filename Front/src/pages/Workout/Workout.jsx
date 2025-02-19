// import React, { useState, useEffect } from "react";
// import Layout from "../../components/Admin/LayoutPages/Layout";
// import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
// import WorkoutTable from "../../components/WorkoutTable/WorkoutTable";
// import Modal from "../../components/Modal/Modal";
// import api from "../../api";
// import { toast } from "react-toastify";
// import "./Workout.css";

// function Workout() {
//   const [workouts, setWorkouts] = useState([]);
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [filters, setFilters] = useState({
//     searchTerm: "",
//     filterBy: "all",
//     sortBy: "name",
//     sortOrder: "asc",
//     itemsPerPage: 5,
//   });

//   const fetchWorkouts = async () => {
//     try {
//       const response = await api.get("/workouts", {
//         params: {
//           search: filters.searchTerm,
//           filterBy: filters.filterBy !== "all" ? filters.filterBy : undefined,
//           sortBy: filters.sortBy,
//           sortOrder: filters.sortOrder,
//           limit: filters.itemsPerPage,
//         },
//       });
//       setWorkouts(response.data);
//     } catch (error) {
//       console.error("Erro ao buscar os treinos:", error);
//     }
//   };

//   useEffect(() => {
//     fetchWorkouts();
//   }, [filters]);

//   const handleOpenModal = () => {
//     setSelectedWorkout(null);
//     setIsModalOpen(true);
//   };

//   const handleEditWorkout = (workout) => {
//     setSelectedWorkout(workout);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setSelectedWorkout(null);
//   };

//   return (
//     <Layout>
//       <div className="workout-content">
//         <header className="workout-header">
//           <h1>Treinos</h1>
//           <button onClick={handleOpenModal} className="btn add-workout">
//             Adicionar Treino
//           </button>
//         </header>

//         <WorkoutTable
//           workouts={workouts}
//           onWorkoutDeleted={fetchWorkouts}
//           setSelectedWorkout={handleEditWorkout}
//           selectedWorkout={selectedWorkout}
//           filters={filters}
//           setFilters={setFilters}
//         />

//         <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
//           <WorkoutForm
//             onWorkoutCreated={fetchWorkouts}
//             selectedWorkout={selectedWorkout}
//             setSelectedWorkout={setSelectedWorkout}
//             onCloseModal={handleCloseModal}
//           />
//         </Modal>
//       </div>
//     </Layout>
//   );
// }

// export default Workout;

import React, { useState, useEffect } from "react";
import Layout from "../../components/Admin/LayoutPages/Layout";
import WorkoutForm from "../../components/WorkoutForm/WorkoutForm";
import WorkoutEditForm from "../../components/WorkoutEditForm/WorkoutEditForm"; // Novo import para edição
import WorkoutTable from "../../components/WorkoutTable/WorkoutTable";
import Modal from "../../components/Modal/Modal";
import api from "../../api";
import { toast } from "react-toastify";
import "./Workout.css";

function Workout() {
  const [workouts, setWorkouts] = useState([]);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    searchTerm: "",
    filterBy: "all",
    sortBy: "name",
    sortOrder: "asc",
    itemsPerPage: 5,
  });

  const fetchWorkouts = async () => {
    try {
      const response = await api.get("/workouts", {
        params: {
          search: filters.searchTerm,
          filterBy: filters.filterBy !== "all" ? filters.filterBy : undefined,
          sortBy: filters.sortBy,
          sortOrder: filters.sortOrder,
          limit: filters.itemsPerPage,
        },
      });
      setWorkouts(response.data);
    } catch (error) {
      console.error("Erro ao buscar os treinos:", error);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, [filters]);

  const handleOpenModal = () => {
    setSelectedWorkout(null);
    setIsModalOpen(true);
  };

  const handleEditWorkout = (workout) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
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
          filters={filters}
          setFilters={setFilters}
        />

        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          {selectedWorkout ? (
            <WorkoutEditForm
              onWorkoutUpdated={fetchWorkouts}
              selectedWorkout={selectedWorkout}
              setSelectedWorkout={setSelectedWorkout}
              onCloseModal={handleCloseModal}
            />
          ) : (
            <WorkoutForm
              onWorkoutCreated={fetchWorkouts}
              selectedWorkout={selectedWorkout}
              setSelectedWorkout={setSelectedWorkout}
              onCloseModal={handleCloseModal}
            />
          )}
        </Modal>
      </div>
    </Layout>
  );
}

export default Workout;
