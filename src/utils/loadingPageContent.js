export default async (url, setPageItems, setPagePagination, setIsLoading, setTotalPages) => {
    fetch(url)
    .then((response) => response.json())
    .then((loadedData) => {
      setPageItems(loadedData.items || {});
      setPagePagination(loadedData.pagination || {});
      setTotalPages(loadedData.pagination.totalPages || 0);
    }).finally(() => {
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}