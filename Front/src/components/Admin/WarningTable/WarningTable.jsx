import React from "react";
import "./WarningTable.css";
import FilterBar from "../../FilterBar/FilterBar";
import Pagination from "../../Pagination/Pagination";

export default function WarningTable({ warnings, filters, setFilters }) {
  const recipientTypeMap = {
    INSTRUCTORS: "Instrutores",
    STUDENTS: "Alunos",
    ALL: "Todos",
  };

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
        itemsPerPageOptions={[5, 10, 20, 50]}
      />

      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Enviada para</th>
          </tr>
        </thead>
        <tbody>
          {warnings.length > 0 ? (
            warnings.map((warning) => (
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

      <Pagination
        currentPage={filters.currentPage}
        warnings={warnings}
        onPageChange={(page) => setFilters((prev) => ({ ...prev, currentPage: page }))}
      />
    </div>
  );
}
