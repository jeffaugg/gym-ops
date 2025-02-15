import React, { useState } from "react";
import "./StudentsTable.css";
import api from "../../../api";
import { toast } from "react-toastify";
import FilterBar from "../../FilterBar/FilterBar";
import { PiCalendarCheckBold } from "react-icons/pi";
import { ImEyePlus } from "react-icons/im";

export default function StudentsTable({ students, setSelectedStudent }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

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
                    className="btn view"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <ImEyePlus />
                  </button>
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
    </div>
  );
}
