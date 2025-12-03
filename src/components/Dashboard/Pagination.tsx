import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  goToPrevPage?: () => void;
  goToNextPage?: () => void;
  isMobile?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  goToPage,
  goToPrevPage,
  goToNextPage,
  isMobile = true
}) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 5) {
    // Mostrar todas las páginas si son 5 o menos
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Lógica para más de 5 páginas
    if (currentPage <= 2) {
      // Cerca del inicio: 1 2 3 ... último
      if (isMobile) {
        pages.push(1, 2, '...', totalPages);
      } 
    } else if (currentPage >= totalPages - 1) {
      // Cerca del final: 1 ... n-2 n-1 n
      if (isMobile) {
        pages.push(1, '...', totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      }
    } else {
      // En el medio: 1 ... current-1 current current+1 ... último
      if (isMobile) {
        pages.push(1, '...', currentPage, '...', totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
  }

  const handlePrev = () => {
    if (currentPage > 1 && goToPrevPage) goToPrevPage();
    else if (currentPage > 1) goToPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages && goToNextPage) goToNextPage();
    else if (currentPage < totalPages) goToPage(currentPage + 1);
  };

  return (
    <div className="join">
      {/* Botón anterior */}
      <button
        className="join-item btn bg-gray-600!"
        onClick={handlePrev}
        disabled={currentPage === 1}
      >
        «
      </button>

      {/* Páginas */}
      {pages.map((page, index) => {
        if (page === '...') {
          return (
            <button key={`ellipsis-${index}`} className="join-item btn !p-3 bg-gray-600!" disabled>
              ...
            </button>
          );
        }

        const pageNum = page as number;
        return (
          <button
            key={pageNum}
            className={`join-item btn bg-gray-600! ${currentPage === pageNum ? '!btn-active !bg-indigo-600' : ''}`}
            onClick={() => goToPage(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Botón siguiente */}
      <button
        className="join-item btn bg-gray-600!"
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;