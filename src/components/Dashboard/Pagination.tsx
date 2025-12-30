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
  // maxVisiblePages = 3
}) => {
  const pages: (number | string)[] = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    if (currentPage > 2 && currentPage < totalPages - 1) {
      if (currentPage > 2) pages.push('...');
      pages.push(currentPage);
    }
    if (currentPage < totalPages - 1) pages.push('...');
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
      <div className="flex items-center justify-between w-full px-2 gap-2 text-slate-100">
        <button onClick={handlePrev} className="btn btn-sm btn-outline bg-secondary! border-slate-500!" disabled={currentPage === 1}>
          «
        </button>
        
        <span className="text-sm font-medium">
          {currentPage} / {totalPages}
        </span>

        <button onClick={handleNext} className="btn btn-sm btn-outline bg-secondary! border-slate-500!" disabled={currentPage === totalPages}>
          »
        </button>
      </div>
  );
};

export default Pagination;