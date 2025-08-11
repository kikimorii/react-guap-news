import { useEffect, useState } from "react";
import loadingPageContent from "./utils/loadingPageContent";

const App = () => {
  const [pagePagination, setPagePagination] = useState({});
  const [pageItems, setPageItems] = useState({});
  const [url, setURL] = useState('https://api.guap.ru/news/v2/get-list-pubs?page=1&itemsOnPage=3');

  useEffect(() => {
    loadingPageContent(url,setPageItems, setPagePagination);
  }, []);

  return (
    <>
      
    </>
  )
}

export default App;