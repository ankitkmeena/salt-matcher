import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  // Generate page numbers with ellipsis window
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-200/60"
      aria-label="Medicine catalog pagination"
    >
      <div className="text-xs sm:text-sm text-slate-500 font-medium">
        Showing <span className="font-bold text-slate-800">{startItem}–{endItem}</span> of{' '}
        <span className="font-bold text-slate-800">{totalItems}</span> verified formulations
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
          className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-full text-xs font-semibold transition-all min-h-[38px] disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200/70"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Prev</span>
        </button>

        {/* Page Number Pills */}
        <div className="flex items-center gap-1">
          {getPageNumbers().map((p, idx) => {
            if (p === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 py-1 text-slate-400 text-xs select-none"
                >
                  •••
                </span>
              );
            }

            const pageNum = p as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange(pageNum)}
                aria-current={isActive ? 'page' : undefined}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-[#183b28] text-white shadow-xs scale-105'
                    : 'bg-white hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200/60'
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
          className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-2 rounded-full text-xs font-semibold transition-all min-h-[38px] disabled:opacity-40 disabled:cursor-not-allowed bg-white hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200/70"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
};
