import { useEffect, useState, useMemo } from "react";
import { loadingPageContent, getQueryParams, getQueryString } from "./utils/utils";
import NewsList from "./components/NewsList";
import SearchForm from './components/SearchForm';

const App = () => {
  const [queryParams, setQueryParams] = useState(window.location.search ? getQueryParams() : { page: 1, });
  const [numberOfPage, setNumberOfPage] = useState(Number(queryParams.page));
  const [pagePagination, setPagePagination] = useState({});
  const [pageItems, setPageItems] = useState({});
  const queryString = useMemo(() => getQueryString(queryParams), [queryParams]);
  const url = `https://api.guap.ru/news/v2/get-list-pubs?${queryString}&itemsOnPage=11`;
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const lastPageQueryString = getQueryString({ page: totalPages });
  const lastPageURL = `https://api.guap.ru/news/v2/get-list-pubs?${lastPageQueryString}&itemsOnPage=11`;
  const [minDateCalendare, setMinDateCalendar] = useState(null);

  useEffect(() => {
    const qs = getQueryString(queryParams);
    if (qs !== window.location.search.slice(1)) {
      window.history.replaceState({}, "", `?${qs}`);
    }
    setNumberOfPage(Number(queryParams.page));
  }, [queryParams]);

  useEffect(() => {
    setQueryParams({ ...queryParams, page: numberOfPage });
  }, [numberOfPage]);

  useEffect(() => {
    setIsLoading(true);
    loadingPageContent(url, setPageItems, setPagePagination, setIsLoading, setTotalPages, lastPageQueryString);
  }, [url]);

  useEffect(() => {
    fetch(lastPageURL)
      .then((r) => r.json()).then((lastPageData) => {
        setMinDateCalendar(new Date(lastPageData.items[lastPageData.items.length - 1].date || null));
        console.log(new Date(lastPageData?.items[lastPageData.items.length - 1]?.date || ""));
      });
  }, [lastPageURL])



  return (
    <>
      <SearchForm queryParams={queryParams} setQueryParams={setQueryParams} minDateCalendare={minDateCalendare} />
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