import React, { useState } from "react";
import "./StudentsTable.css";
import api from "../../../api";
import { FaPenToSquare } from "react-icons/fa6";
import { toast } from "react-toastify";
import FilterBar from "../../FilterBar/FilterBar"; 
import { MdOutlineDelete } from "react-icons/md";
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";
import { PiCalendarCheckBold } from "react-icons/pi";

export default function StudentsTable({
  students,
  onStudentDeleted,
  setSelectedStudent,
  selectedStudent,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [sortField, setSortField] = useState("name"); 
  const [sortOrder, setSortOrder] = useState("asc");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      if (selectedStudent && selectedStudent.id === id) {
        setSelectedStudent(null);
      }
      toast.success("Aluno deletado com sucesso!");
      onStudentDeleted();
    } catch (error) {
      console.error("Erro ao deletar o aluno:", error);
      toast.error("Erro ao deletar o aluno.");
    }finally {
      setIsModalOpen(false);
    }
  };

  const confirmDelete = (id) => {
    setSelectedId(id);
    setIsModalOpen(true);
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

  const toggleSortOrder = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredAndSortedStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.cpf.includes(searchTerm) ||
        student.telephone.includes(searchTerm);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && student.status) ||
        (statusFilter === "inactive" && !student.status);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortField === "name") {
        return sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortField === "created_at") {
        return sortOrder === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      }
      return 0;
    });

  return (
    <div className="students-list">
      <FilterBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortField={sortField}
        setSortField={setSortField}
        sortOrder={sortOrder}
        toggleSortOrder={toggleSortOrder}
        placeholder="Buscar por nome, telefone ou CPF"
      />

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Telefone</th>
            <th>Status</th>
            <th>Data de Criação</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedStudents.length > 0 ? (
            filteredAndSortedStudents.map((student) => (
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
                <td>{new Date(student.created_at).toLocaleDateString()}</td>
                <td className="actions">
                  <button
                    className="btn presence"
                    onClick={() => handleRegisterPresence(student)}
                  >
                    <PiCalendarCheckBold />
                  </button>
                  <button
                    className="btn edit"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <FaPenToSquare />
                  </button>
                  {/* <button
                    className="btn delete"
                    onClick={() => confirmDelete(student.id)}
                  >
                    <MdOutlineDelete />
                  </button> */}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Nenhum aluno encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={() => handleDelete(selectedId)}
          message={`Tem certeza que deseja deletar este aluno "${students.find(students => students.id === selectedId)?.name}"?`}
        />
      )}
    </div>
  );
}
