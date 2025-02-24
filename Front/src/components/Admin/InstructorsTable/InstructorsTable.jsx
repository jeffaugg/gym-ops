import React, { useState } from "react";
import "./InstructorsTable.css";
import api from "../../../api";
import { toast } from "react-toastify";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineDelete } from "react-icons/md";
import FilterBar from "../../FilterBar/FilterBar"; 
import ConfirmationModal from "../../Modal/ConfirmationModal/ConfirmationModal";

export default function InstructorsTable({ instructors, onPlanDeleted, setSelectedInstructor, selectedInstructor, filters, setFilters }) {
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

  const filteredAndSortedInstructors = instructors
    .filter((instructor) => {
      const matchesSearch =
        filters.filterBy === "all" ||
        (filters.filterBy === "active" && instructor.status === true) ||
        (filters.filterBy === "inactive" && instructor.status === false);
      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.sortBy === "name") {
        return filters.sortOrder === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (filters.sortBy === "cref") {
        return filters.sortOrder === "asc"
          ? a.cref.localeCompare(b.cref)
          : b.cref.localeCompare(a.cref);
      } else if (filters.sortBy === "tel") {
        return filters.sortOrder === "asc"
          ? a.tel.localeCompare(b.tel)
          : b.tel.localeCompare(a.tel);
      } else if (filters.sortBy === "daysofweek") {
        return filters.sortOrder === "asc"
          ? a.daysofweek.length - b.daysofweek.length
          : b.daysofweek.length - a.daysofweek.length;
      } else if (filters.sortBy === "status") {
        return filters.sortOrder === "asc"
          ? (a.status === true ? 1 : 0) - (b.status === true ? 1 : 0)
          : (b.status === true ? 1 : 0) - (a.status === true ? 1 : 0);
      }
      return 0;
    })
    .slice(0, filters.itemsPerPage);

  return (
    <div className="instructors-list">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar por nome, CREF ou telefone"
        filterOptions={[
          { value: "all", label: "Todos" },
          { value: "active", label: "Ativos" },
          { value: "inactive", label: "Inativos" },
        ]}
        sortOptions={[
          { value: "name", label: "Nome" },
          { value: "cref", label: "CREF" },
          { value: "tel", label: "Telefone" },
          { value: "daysofweek", label: "Dias de Trabalho" },
          { value: "status", label: "Status" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100]}
      />

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
          {filteredAndSortedInstructors.length > 0 ? (
            filteredAndSortedInstructors.map((instructor) => (
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
