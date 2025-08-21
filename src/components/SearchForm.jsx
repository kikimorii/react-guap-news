import styles from './SearchForm.module.scss';
import { useEffect, useState } from 'react';
import FilterTitle from './filter/FilterTitle';
import FilterMenu from './filter/FilterMenu';
import FilterSearch from './filter/FilterSearch';

const SearchForm = ({ queryParams, setQueryParams }) => {
    const [currentQueryParams, setCurrentQueryParams] = useState(queryParams);
    const [filterCount, setFilterCount] = useState(null);
    const [isFilterListVisiable, setIsFilterListVisiable] = useState(false);
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (currentQueryParams.find === "" || currentQueryParams.find == undefined) delete currentQueryParams.find
        else if (queryParams.find !== currentQueryParams.find) {
            currentQueryParams.find = encodeURIComponent(currentQueryParams.find)
        };
        setQueryParams({ ...currentQueryParams, page: 1 });
        setIsFilterListVisiable(false);
    };
    const handleOnChange = ({ target }) => setCurrentQueryParams({ ...currentQueryParams, [target.name]: target.value });

    useEffect(() => {
        setFilterCount(Object.keys(queryParams).length - 1);
    }, [queryParams]);

    return (
        <form className={styles.form} onSubmit={handleOnSubmit}>

            <FilterTitle filterCount={filterCount} setIsFilterListVisiable={setIsFilterListVisiable} isFilterListVisiable={isFilterListVisiable} />
            <FilterMenu isFilterListVisiable={isFilterListVisiable} currentQueryParams={currentQueryParams} setCurrentQueryParams={setCurrentQueryParams} />
            <FilterSearch currentQueryParams={currentQueryParams} handleOnChange={handleOnChange} />

        </form>
    )
};

export default SearchForm;