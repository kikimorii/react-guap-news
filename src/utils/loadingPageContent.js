export default async (url, setPageItems, setPagePagination) => {
    fetch(url)
    .then((response) => response.json())
    .then((loadedData) => {
      setPageItems(loadedData.items || {});
      setPagePagination(loadedData.pagintaion || {});
    })
    .catch((error) => console.log(error));
}