import { useEffect, useState } from "react";
import { loadingPageContent } from "./utils/utils";
import NewsList from "./components/NewsList";

const App = () => {
  const [pagePagination, setPagePagination] = useState({});
  const [numberOfPage, setNumberOfPage] = useState(1);
  const [pageItems, setPageItems] = useState({});
  const url = `https://ai.guap.ru/news/v2/get-list-pubs?page=${numberOfPage}&itemsOnPage=10`;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    loadingPageContent(url, setPageItems, setPagePagination, setIsLoading);
  }, [url]);

  return (
    <>
      <NewsList
        newsList={pageItems}
        isLoading={isLoading}
        pagePagination={pagePagination}
        setNumberOfPage={setNumberOfPage}
        numberOfPage={numberOfPage}
      />

    </>
  )
};

export default App;