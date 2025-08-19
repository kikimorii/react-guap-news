export default (currentPage, totalPages) => {
  const pageNumbers = [];

  let startPage = currentPage - 2;
  let endPage = currentPage + 2;

  if (currentPage <= 3) {
    startPage = 1;
    endPage = Math.min(5, totalPages);
  }
  else if (currentPage >= totalPages - 2) {
    startPage = Math.max(totalPages - 4, 1);
    endPage = totalPages;
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return pageNumbers;
};
