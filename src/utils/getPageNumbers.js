export default (currentPage, totalPages) => {
    const pageNumbers = [];
    const lineBreak = "...";

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    pageNumbers.push(1);

    if (startPage > 2) {
        pageNumbers.push(lineBreak);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
        pageNumbers.push(lineBreak);
    }

    if (totalPages > 1) {
        pageNumbers.push(totalPages);
    }

    return pageNumbers;
};