"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  pageNumbers: (number | string)[];
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({
  pageNumbers,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const validPages = pageNumbers.filter(
    (page) => typeof page === "number" || page === "..."
  );

  if (validPages.length <= 1) return null;

  const firstPage = 1;
  const lastPage = validPages.filter((p) => typeof p === "number").pop() as number;

  return (
    <ul className="pagination flex justify-center items-center gap-2 flex-row-reverse">
      <li
        className={`w-8 h-8 flex justify-center items-center cursor-pointer transition-colors ${
          currentPage === firstPage
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
      >
        <ChevronLeft className="text-brand-600 w-7 h-7" />
      </li>

      {validPages.map((page, index) => (
        <li
          key={`${page}-${index}`}
          className={`border border-brand-600 text-base rounded-xl w-8 h-8 flex justify-center items-center transition-colors ${
            currentPage === page
              ? "bg-brand-600 text-white"
              : "text-brand-600 hover:bg-brand-50"
          }`}
        >
          {page === "..." ? (
            <span className="text-lg select-none">...</span>
          ) : (
            <button
              onClick={() => onPageChange(page as number)}
              className="w-full h-full outline-0 pt-0.5"
            >
              {page}
            </button>
          )}
        </li>
      ))}

      <li
        className={`w-8 h-8 flex justify-center items-center cursor-pointer transition-colors ${
          currentPage === lastPage
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={() => currentPage < lastPage && onPageChange(currentPage + 1)}
      >
        <ChevronRight className="text-brand-600 w-7 h-7" />
      </li>
    </ul>
  );
};

export default Pagination;