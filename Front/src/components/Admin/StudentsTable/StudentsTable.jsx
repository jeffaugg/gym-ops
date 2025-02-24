import React from "react";
import "./StudentsTable.css";
import { FaPenToSquare } from "react-icons/fa6";
import { toast } from "react-toastify";
import FilterBar from "../../FilterBar/FilterBar"; 
import api from "../../../api";

export default function StudentsTable({
  students,
  onStudentDeleted,
  setSelectedStudent,
  selectedStudent,
  filters,
  setFilters,
}) {
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
    }
  };

  const filteredAndSortedStudents = students
    .filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        student.cpf.includes(filters.searchTerm) ||
        student.telephone.includes(filters.searchTerm);

      const matchesStatus =
        filters.filterBy === "all" ||
        (filters.filterBy === "active" && student.status) ||
        (filters.filterBy === "inactive" && !student.status);

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return filters.sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (filters.sortBy === "created_at") {
        return filters.sortOrder === "asc"
          ? new Date(a.created_at) - new Date(b.created_at)
          : new Date(b.created_at) - new Date(a.created_at);
      } else if (filters.sortBy === "status") {
        return filters.sortOrder === "asc"
          ? (a.status ? 1 : 0) - (b.status ? 1 : 0)
          : (b.status ? 1 : 0) - (a.status ? 1 : 0);
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="students-list">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome, telefone ou CPF"
        filterOptions={[
          { value: "all", label: "Todos" },
          { value: "active", label: "Ativos" },
          { value: "inactive", label: "Inativos" },
        ]}
        sortOptions={[
          { value: "name", label: "Nome" },
          { value: "created_at", label: "Data de Criação" },
          { value: "status", label: "Status" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
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
                    className="btn edit"
                    onClick={() => setSelectedStudent(student)}
                  >
                    <FaPenToSquare />
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
