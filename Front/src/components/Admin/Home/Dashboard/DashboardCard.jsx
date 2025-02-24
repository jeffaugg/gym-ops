import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaUserCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import api from "../../../../api"; // Importe corretamente a instância do Axios

function DashboardCard({ title, endpoint }) {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasNextPage, setHasNextPage] = useState(true); // Variável para controlar a existência de próxima página
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get(`report/${endpoint}`, {
          params: {
            limit: itemsPerPage,
            page: currentPage,
          },
        });

        setItems(response.data);

        // Verifica se há próxima página
        if (response.data.length < itemsPerPage) {
          setHasNextPage(false); // Desativa o botão de "Próximo" se não houver mais itens
        } else {
          setHasNextPage(true); // Caso contrário, ativa o botão de "Próximo"
        }
      } catch (err) {
        setError(err.response?.data?.message || "Erro ao buscar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [currentPage, endpoint]);

  const handleNextPage = () => {
    if (hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="dashboard-card">
      <h4>{title}</h4>

      {loading && <p>Carregando...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <ul>
            {items.map((item, index) => {
              const position = (currentPage - 1) * itemsPerPage + index + 1;
              return (
                <li key={index}>
                  <span className="user-icon">
                    <FaUserCircle color="#1a1a7d" />
                  </span>
                  {position}. {item.name} {/* Ajuste conforme a estrutura da API */}
                </li>
              );
            })}
          </ul>

          <div className="pagination-buttons">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              style={{ fontSize: "18px" }}
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextPage}
              disabled={!hasNextPage}
              style={{ fontSize: "18px" }}
            >
              <FaChevronRight />
            </button>
          </div>
        </>
      )}
    </div>
  );
}

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  endpoint: PropTypes.string.isRequired,
};

export default DashboardCard;
