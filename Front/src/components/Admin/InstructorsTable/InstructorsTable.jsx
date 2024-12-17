import React from "react";
import "./InstructorsTable.css";
import api from "../../../api";
import { toast } from "react-toastify";

export default function InstructorsTable({ instructors, onPlanDeleted, setSelectedInstructor }) {
  // const handleDelete = async (id) => {
  //   try {
  //     await api.delete(`/clients/${id}`);
  //     toast.success("Instrutor deletado com sucesso!");
  //     onPlanDeleted();
  //   } catch (error) {
  //     console.error("Erro ao deletar o instrutor:", error);
  //     toast.error("Erro ao deletar o instrutor.");
  //   }
  // };

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
              <tr>
                <td>Nome do Instrutor</td>
                <td>123.456.789-10</td>
                <td>88912345678</td>
                <td>SEG, TER, QUA</td>
                <td>Manhã</td>
                <td>
                  <button className="btn edit" onClick={() => setSelectedInstructor(instructor)}>
                    ✏️
                  </button>
                  <button className="btn delete" onClick={() => handleDelete(instructor.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            <tr>
              {/* <td colSpan="4">Nenhum instrutor encontrado.</td> */}
            </tr>
        </tbody>
      </table>
    </div>
  );
}
