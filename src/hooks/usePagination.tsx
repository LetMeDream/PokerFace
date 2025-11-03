import { useEffect, useState } from 'react'
import type { AllTickets } from '../types/Slices';

const usePagination = ({
  elements,
  itemsPerPage,
  inboxSearchValue
}: {
  elements: AllTickets;
  itemsPerPage: number;
  inboxSearchValue?: string;
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(elements.length / itemsPerPage);
  /* Calculate indexes for the returned array */
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  /* Filter posts using Slice */
  const currentItems = elements.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => { goToPage(currentPage + 1) }
  const goToPreviousPage = () => { goToPage(currentPage - 1) }

  /* Array with numbers, for displaying pagination */
  const paginationNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  /* Booleans for enabling/disabling buttons */
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    setCurrentPage(1);
  }, [inboxSearchValue]);

  return {
    currentItems,
    totalPages,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    paginationNumbers,
    isFirstPage,
    isLastPage,
    currentPage
  }
}

export default usePagination