import React from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      {/* Prev Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-3 rounded-full border border-platinum/50 flex items-center justify-center transition-all ${
          currentPage === 1
            ? 'text-gray-x-11 bg-gray-50 border-gray-100 cursor-not-allowed'
            : 'text-eerie-black-1 bg-white hover:bg-kappel hover:text-white cursor-pointer'
        }`}
        aria-label="Previous Page"
      >
        <IoChevronBack className="text-lg" />
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-[45px] h-[45px] rounded-full border flex items-center justify-center font-spartan text-[1.5rem] font-bold transition-all cursor-pointer ${
            currentPage === page
              ? 'bg-kappel text-white border-kappel shadow-sm'
              : 'bg-white text-eerie-black-1 border-platinum/50 hover:bg-kappel/10 hover:text-kappel'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`p-3 rounded-full border border-platinum/50 flex items-center justify-center transition-all ${
          currentPage === totalPages
            ? 'text-gray-x-11 bg-gray-50 border-gray-100 cursor-not-allowed'
            : 'text-eerie-black-1 bg-white hover:bg-kappel hover:text-white cursor-pointer'
        }`}
        aria-label="Next Page"
      >
        <IoChevronForward className="text-lg" />
      </button>
    </div>
  );
}

export default Pagination;
