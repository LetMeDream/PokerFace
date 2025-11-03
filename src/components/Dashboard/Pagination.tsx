import React from 'react'

const Pagination = (
  { 
    totalPages, 
    currentPage, 
    goToPage 
  } : { 
    totalPages: number; 
    currentPage: number; 
    goToPage: (page: number) => void; 
  }
) => {
  return (
    <>
      <div className="join">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`join-item btn ${currentPage === i + 1 ? '!btn-active !bg-indigo-600' : ''}`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </>
  )
}

export default Pagination