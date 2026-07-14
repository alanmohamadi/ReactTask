export const GeneratePageNumbers = (
  totalPages: number,
  currentPage: number
): (number | string)[] => {
  if (totalPages <= 1) {
    return [1];
  }
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [];
  const showPages = 2;

  pages.push(1);

  if (currentPage > showPages + 1) {
    pages.push("...");
  }

  let start = Math.max(2, currentPage - Math.floor(showPages / 2));
  let end = Math.min(totalPages - 1, currentPage + Math.floor(showPages / 2));

  if (currentPage <= showPages) {
    end = showPages + 1;
  }
  if (currentPage > totalPages - showPages) {
    start = totalPages - showPages;
  }

  for (let i = start; i <= end; i++) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  if (end < totalPages - 1) {
    pages.push("...");
  }

  if (!pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return pages;
};


export const paginationArguments = (
  totalItems: number,
  itemsPerPage: number,
  currentPage: number
): { pageNumbers: (number | string)[]; totalPages: number } => {
  if (!totalItems || totalItems <= 0) {
    return { pageNumbers: [], totalPages: 0 };
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = GeneratePageNumbers(totalPages, currentPage);

  return { pageNumbers, totalPages };
};