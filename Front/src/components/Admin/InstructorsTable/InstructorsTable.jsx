import React, { useState } from "react";
import "./InstructorsTable.css";
import api from "../../../api";
import { toast } from "react-toastify";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

export default function InstructorsTable({ instructors, onPlanDeleted, setSelectedInstructor, selectedInstructor }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null); 

  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/${id}`);
      if (selectedInstructor && selectedInstructor.id === id) {
        setSelectedInstructor(null); 
      }
      toast.success("Instrutor deletado com sucesso!");
      onPlanDeleted();
    } catch (error) {
      console.error("Erro ao deletar o instrutor:", error);
      toast.error("Erro ao deletar o instrutor.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const dayMapping = {
    Domingo: 1,
    Segunda: 2,
    Terça: 3,
    Quarta: 4,
    Quinta: 5,
    Sexta: 6,
    Sábado: 7,
  };
  const turnMapping = {
    1: "Manhã",
    2: "Tarde",
    3: "Noite",
  };

  return (
    <div className="instructors-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CREF</th>
            <th>Telefone</th>
            <th>Dias</th>
            <th>Turno</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {instructors.length > 0 ? (
            instructors.map((instructor) => (
              <tr key={instructor.id}>
                <td>{instructor.name}</td>
                <td>{instructor.cref}</td>
                <td>{instructor.tel}</td>
                <td>
                  {instructor.daysofweek 
                    ? instructor.daysofweek
                        .map((day) => {
                          const dayId = dayMapping[day];
                          return dayId ? ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][dayId - 1] : day;
                        })
                        .join(", ")
                    : "N/D"}
                </td>
                <td>{instructor.turntime ? turnMapping[instructor.turntime.id] || "N/D" : "N/D"}</td>
                <td className="actions">
                <button
                    className="btn edit"
                    onClick={() =>
                      setSelectedInstructor({
                        ...instructor,
                        daysofweek: instructor.daysofweek.map((day) => {
                          const dayId = dayMapping[day];
                          return dayId || day;
                        }),
                        turntime: instructor.turntime?.id || null,
                      })
                    }
                  >
                    <FaPenToSquare />
                  </button>
                  {/* <button className="btn delete" onClick={() => confirmDelete(instructor.id)}>
                    <MdOutlineDelete />
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum instrutor encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={() => handleDelete(selectedId)}
        message={`Tem certeza que deseja deletar este instrutor "${instructors.find(instructor => instructor.id === selectedId)?.name}"?`}
        />
    </div>
  );
}
