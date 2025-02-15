import React from "react";
import "./FilterBar.css";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";

export default function FilterBar({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  sortField,
  setSortField,
  sortOrder,
  toggleSortOrder,
  statusOptions = [
    { value: "all", label: "Todos" },
    { value: "active", label: "Ativos" },
    { value: "inactive", label: "Inativos" },
  ],
  sortOptions = [
    { value: "name", label: "Nome" },
    { value: "created_at", label: "Data de Criação" },
  ],
  placeholder = "Buscar..."
}) {
  return (
    <div className="filter-bar">
      <div className="filters">
        <div className="show-filters">
          Mostrar somente:
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="filter-select"
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="order-filters">
          Ordenar por:
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="filter-select"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button onClick={toggleSortOrder} className="btn-sort-order">
            {sortOrder === "asc" ? <TbArrowBigUpFilled /> : <TbArrowBigDownFilled />}
          </button>
        </div>
      </div>

      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
}
