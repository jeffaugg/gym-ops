import React from "react";
import "./InstructorsTable.css";
import api from "../../../api";
import { toast } from "react-toastify";

export default function InstructorsTable({ instructors, onPlanDeleted, setSelectedInstructor }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/user/allusers/${id}`);
      toast.success("Instrutor deletado com sucesso!");
      onPlanDeleted();
    } catch (error) {
      console.error("Erro ao deletar o instrutor:", error);
      toast.error("Erro ao deletar o instrutor.");
    }
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
                <td>{instructor.turnTime || "N/D"}</td> {/* Verifica se a propriedade existe */}
                <td>{instructor.shift || "N/D"}</td> {/* Exemplo: turno (Manhã/Tarde/Noite) */}
                <td>
                  <button className="btn edit" onClick={() => setSelectedInstructor(instructor)}>
                    ✏️
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(instructor.id)}>
                    ❌
                  </button>
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
    </div>
  );
}
