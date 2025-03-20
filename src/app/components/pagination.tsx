"use client";
import React from "react";

interface PaginationProps {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  pageSize,
  totalItems,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / pageSize);
  if (totalPages === 0) return null;

  const getPageNumbers = (current: number, total: number): (number | string)[] => {
    const pages: (number | string)[] = [];
    if (total <= 7) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (current > 4) {
        pages.push("...");
      }
      const start = Math.max(2, current - 2);
      const end = Math.min(total - 1, current + 2);
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      if (current < total - 3) {
        pages.push("...");
      }
      pages.push(total);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex justify-center items-center mt-4 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Anterior
      </button>
      <div className="hidden sm:flex gap-2">
        {pageNumbers.map((page, index) =>
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => onPageChange(page)}
              className={`cursor-pointer px-3 py-1 rounded text-white ${
                page === currentPage ? "bg-blue-700" : "bg-blue-500"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-3 py-1 text-gray-500">
              {page}
            </span>
          )
        )}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="cursor-pointer px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50"
      >
        Siguiente
      </button>
    </div>
  );
};

export default Pagination;