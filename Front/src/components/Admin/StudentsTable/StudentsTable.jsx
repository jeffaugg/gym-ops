import React from "react";
import "./StudentsTable.css";
import api from "../../../api";
import { toast } from "react-toastify";

export default function StudentsTable({
  students,
  onPlanDeleted,
  setSelectedStudent,
  selectedStudent,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); 
  const [sortField, setSortField] = useState("name"); 
  const [sortOrder, setSortOrder] = useState("asc");

  const handleDelete = async (id) => {
    try {
      await api.delete(`/clients/${id}`);
      if (selectedStudent && selectedStudent.id === id) {
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
      <div className="filters-container">
        <div className="filters">
          <div className="show-filters">
            Mostrar somente:
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="filter-select"
            >
              <option value="all">Todos os alunos</option>
              <option value="active">Alunos ativo</option>
              <option value="inactive">Alunos inativo</option>
            </select>
          </div>
          <div className="order-filters">
            Ordenar por:
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="filter-select"
            >
              <option value="name">Nome</option>
              <option value="created_at">Data de Criação</option>
            </select>
            <button onClick={toggleSortOrder} className="btn-sort-order">
              {sortOrder === "asc" ? "⬆️" : "⬇️"}
            </button>
          </div>
        </div>
        <input
          type="text"
          placeholder="Buscar por nome, telefone ou CPF"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
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
                    ✅
                  </button>
                  <button
                    className="btn edit"
                    onClick={() => setSelectedStudent(student)}
                  >
                    ✏️
                  </button>
                  <button
                    className="btn delete"
                    onClick={() => handleDelete(student.id)}
                  >
                    ❌
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