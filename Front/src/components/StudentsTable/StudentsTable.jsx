import React from "react";
import "./StudentsTable.css";
import api from "../../api";
import { toast } from "react-toastify";

export default function StudentsTable({ students, onPlanDeleted }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      toast.success("Aluno deletado com sucesso!");
      onPlanDeleted();
    } catch (error) {
      console.error("Erro ao deletar o aluno:", error);
      toast.error("Erro ao deletar o aluno.");
    }
  };

  return (
    <div className="students-list">
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.cpf}</td>
                <td>{student.telephone}</td>
                <td>
                  <button className="btn delete" onClick={() => handleDelete(student.id)}>
                    ❌
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Nenhum aluno encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
