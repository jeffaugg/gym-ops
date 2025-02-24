import React from "react";
import "./Pagination.css";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";

const Pagination = ({ currentPage, onPageChange, warnings }) => {
  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)} className="btn pagination-btn">
          <FaArrowLeftLong /> 
        </button>
      )}

      <span>Página {currentPage}</span>

      {warnings.length > 0 && (
        <button onClick={() => onPageChange(currentPage + 1)} className="btn pagination-btn">
           <FaArrowRightLong />
        </button>
      )}
    </div>
  );
};

export default Pagination;
