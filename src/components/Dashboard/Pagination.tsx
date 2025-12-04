import React from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  goToPrevPage?: () => void;
  goToNextPage?: () => void;
  isMobile?: boolean;
  maxVisiblePages?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  currentPage,
  goToPage,
  goToPrevPage,
  goToNextPage,
  maxVisiblePages = 5
}) => {
  const pages: (number | string)[] = [];

// 1. Caso Trivial: Si el total es menor o igual al máximo visible, mostrar todos.
  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  // 2. Definir cuántas páginas fijas se mostrarán en los bordes (ej: 1, 2, ... o ..., 9, 10).
  // Y cuántas alrededor de la página actual.
  const edgeCount = 1; // Páginas fijas al inicio y al final (1 y totalPages)
  const boundaryCount = 1; // Páginas adyacentes a la actual (current-1, current+1)
  
  // Calcular el rango del centro (alrededor de currentPage)
  const startPage = Math.max(edgeCount + 1, currentPage - boundaryCount);
  const endPage = Math.min(totalPages - edgeCount, currentPage + boundaryCount);

  // 3. Agregar la primera página y los puntos suspensivos iniciales
  if (!(totalPages <= maxVisiblePages)) pages.push(1);
  if (startPage > edgeCount + 1) {
    pages.push('...');
  }
  
  // 4. Agregar las páginas centrales
  for (let i = startPage; i <= endPage; i++) {
    // Asegurar que no se repitan páginas ya agregadas (como la 1)
    if (i > 1 && i < totalPages) {
      pages.push(i);
    }
  }

  // 5. Agregar los puntos suspensivos finales y la última página
  if (endPage < totalPages - edgeCount) {
    pages.push('...');
  }
  // Asegurar que la última página se agregue solo si no es la página 1
  if (totalPages > 1 && pages[pages.length - 1] !== totalPages) {
    pages.push(totalPages);
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
        className="join-item btn bg-gray-600! mr-0.5"
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
            className={`join-item btn bg-gray-600 ${currentPage === pageNum ? '!btn-active !bg-indigo-600' : ''}`}
            onClick={() => goToPage(pageNum)}
          >
            {pageNum}
          </button>
        );
      })}

      {/* Botón siguiente */}
      <button
        className="join-item btn bg-gray-600! ml-0.5"
        onClick={handleNext}
        disabled={currentPage === totalPages || totalPages === 0}
      >
        »
      </button>
    </div>
  );
};

export default Pagination;