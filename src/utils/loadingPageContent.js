export default async (url, setPageItems, setPagePagination, setIsLoading) => {
    fetch(url)
    .then((response) => response.json())
    .then((loadedData) => {
      setPageItems(loadedData.items || {});
      setPagePagination(loadedData.pagination || {});
    }).finally(() => {
      setIsLoading(false);
    })
    .catch((error) => {
      console.log(error);
    });
}