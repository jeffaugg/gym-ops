import React from "react";
import "./StudentsTable.css";
import api from "../../../api";
import { toast } from "react-toastify";

export default function StudentsTable({ students, onPlanDeleted, setSelectedStudent, selectedStudent }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      if(selectedStudent && selectedStudent.id == id) {
        setSelectedStudent(null);
      }
      toast.success("Aluno deletado com sucesso!");
      onPlanDeleted();
    } catch (error) {
      console.error("Erro ao deletar o aluno:", error);
      toast.error("Erro ao deletar o aluno.");
    }
  };
  const handleRegisterPresence = async (student) => {
    try {
      await api.post(`/presence/${student.id}`);
      toast.success(`Presença registrada para ${student.name} com sucesso!`);
    } catch (error) {
      console.error("Erro ao registrar presença:", error);
      toast.error("Erro ao registrar a presença.");
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
            <th>Status</th>
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
                  {student.status ? (
                    <span className="status active">Ativo</span>
                  ) : (
                    <span className="status inactive">Inativo</span>
                  )}
                </td>
                <td>
                  <button
                    className="btn presence"
                    onClick={() => handleRegisterPresence(student)}
                  >
                    ✅
                  </button>
                  <button className="btn edit" onClick={() => setSelectedStudent(student)}>
                    ✏️
                  </button>
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
