import React from "react";
import { TbArrowBigDownFilled, TbArrowBigUpFilled } from "react-icons/tb";
import "./FilterBar.css";

export default function FilterBar({
  filters = {}, // Garante que filters tenha um valor padrão
  setFilters,
  searchPlaceholder = "Buscar...",
  filterOptions = [],
  sortOptions = [],
  itemsPerPageOptions = [5, 10, 20, 50],
}) {
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="filter-bar">
      <div className="filters">
        {filterOptions.length > 0 && (
          <div className="filter-group">
            Filtrar por:
            <select
              value={filters.filterBy || "all"} // Garante que tenha um valor padrão
              onChange={(e) => handleFilterChange("filterBy", e.target.value)}
              className="filter-select"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {sortOptions.length > 0 && (
          <div className="filter-group">
            Ordenar por:
            <select
              value={filters.sortBy || ""}
              onChange={(e) => handleFilterChange("sortBy", e.target.value)}
              className="filter-select"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                handleFilterChange("sortOrder", filters.sortOrder === "asc" ? "desc" : "asc")
              }
              className="btn-sort-order"
            >
              {filters.sortOrder === "asc" ? <TbArrowBigUpFilled /> : <TbArrowBigDownFilled />}
            </button>
          </div>
        )}

        <div className="filter-group">
          Itens por página:
          <select
            value={filters.itemsPerPage || itemsPerPageOptions[0]} // Garante um valor inicial
            onChange={(e) => handleFilterChange("itemsPerPage", Number(e.target.value))}
            className="filter-select"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <input
        type="text"
        placeholder={searchPlaceholder}
        value={filters.searchTerm || ""} // Garante que tenha um valor inicial
        onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
        className="search-input"
      />
    </div>
  );
}