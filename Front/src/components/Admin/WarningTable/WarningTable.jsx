import React from "react";
import "./WarningTable.css";
import FilterBar from "../../FilterBar/FilterBar";

export default function WarningTable({ warnings, filters, setFilters }) {
  const recipientTypeMap = {
    INSTRUCTORS: "Instrutores",
    STUDENTS: "Alunos",
    ALL: "Todos",
  };

  // Aplicação de filtros na lista de avisos
  const filteredWarnings = warnings
    .filter((warning) => 
      (!filters.searchTerm || warning.title.toLowerCase().includes(filters.searchTerm.toLowerCase())) &&
      (filters.filterBy === "all" || warning.recipient_type === filters.filterBy)
    )
    .sort((a, b) => {
      if (filters.sortBy) {
        const valueA = a[filters.sortBy].toLowerCase();
        const valueB = b[filters.sortBy].toLowerCase();
        return filters.sortOrder === "asc" ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      }
      return 0;
    });

  // **Agora aplicando corretamente a limitação de itens por página**
  const displayedWarnings = filteredWarnings.slice(0, filters.itemsPerPage);

  return (
    <div className="warnings-list">
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        searchPlaceholder="Buscar avisos..."
        filterOptions={[
          { value: "all", label: "Todos" },
          { value: "INSTRUCTORS", label: "Instrutores" },
          { value: "STUDENTS", label: "Alunos" },
        ]}
        sortOptions={[
          { value: "title", label: "Título" },
          { value: "recipient_type", label: "Tipo de Destinatário" },
        ]}
        itemsPerPageOptions={[5, 10, 30, 50, 100 ]} // Adiciona "Todos"
      />

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Enviada para</th>
          </tr>
        </thead>
        <tbody>
          {displayedWarnings.length > 0 ? (
            displayedWarnings.map((warning) => (
              <tr key={warning.id}>
                <td>{warning.title}</td>
                <td>{recipientTypeMap[warning.recipient_type] || "Desconhecido"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">Nenhum aviso encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
