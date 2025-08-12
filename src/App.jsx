import { useEffect, useState } from "react";
import { loadingPageContent } from "./utils/utils";
import NewsList from "./components/NewsList";

const App = () => {
  const [pagePagination, setPagePagination] = useState({});
  const [pageItems, setPageItems] = useState({});
  const [url, setURL] = useState('https://api.guap.ru/news/v2/get-list-pubs?page=1&itemsOnPage=3');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadingPageContent(url, setPageItems, setPagePagination, setIsLoading);
  }, []);

  return (
    <>
      <NewsList newsList={pageItems} isLoading={isLoading} />
    </>
  )
};

export default App;