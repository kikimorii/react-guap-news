import styles from './SearchForm.module.scss';
import { useEffect, useState } from 'react';
import FilterTitle from './filter/FilterTitle';
import FilterMenu from './filter/FilterMenu';
import FilterSearch from './filter/FilterSearch';

const SearchForm = ({ queryParams, setQueryParams }) => {
    const [currentQueryParams, setCurrentQueryParams] = useState(queryParams);
    const [filterCount, setFilterCount] = useState(null);
    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (currentQueryParams.find === "") delete currentQueryParams.find
        else currentQueryParams.find = encodeURIComponent(currentQueryParams.find)
        setQueryParams({ ...currentQueryParams });
    };
    const handleOnChange = ({ target }) => setCurrentQueryParams({ ...currentQueryParams, [target.name]: target.value });

    useEffect(() => {
        setFilterCount(Object.keys(queryParams).length - 1);
    }, [queryParams]);
    const [isFilterListVisiable, setIsFilterListVisiable] = useState(false);

    return (
        <form className={styles.form} onSubmit={handleOnSubmit}>

            <FilterTitle filterCount={filterCount} setIsFilterListVisiable={setIsFilterListVisiable} isFilterListVisiable={isFilterListVisiable} />
            <FilterMenu isFilterListVisiable={isFilterListVisiable} />
            <FilterSearch currentQueryParams={currentQueryParams} handleOnChange={handleOnChange} />

        </form>
    )
};

export default SearchForm;