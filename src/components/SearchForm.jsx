import styles from './SearchForm.module.scss';
import { useEffect, useState } from 'react';
import FilterTitle from './filter/FilterTitle';
import FilterMenu from './filter/FilterMenu';
import FilterSearch from './filter/FilterSearch';
import FilterChips from './filter/FilterChips';

const SearchForm = ({ queryParams, setQueryParams, minDateCalendare }) => {
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
    const resetQueryParams = () => {
        setQueryParams({ page: 1 });
        setCurrentQueryParams({ page: 1 });
        setIsFilterListVisiable(false);
    };

    const deleteQueryParam = (key) => {
        const newParam = {...currentQueryParams};
        if (key === 'end' || key === 'begin') {
            delete newParam[key];
        } else {
            const [tagName, id] = key.split("-");
            const index = newParam[tagName].indexOf(id);
            newParam[tagName].splice(index, 1);
            if (newParam[tagName].length === 0) delete newParam[tagName];
        }
        setCurrentQueryParams(newParam);
        setQueryParams(newParam);
    }

    useEffect(() => {
        setFilterCount(Object.keys(queryParams).length - 1);
    }, [queryParams]);

    return (
        <form className={styles.form} onSubmit={handleOnSubmit} id="searchForm">
            <FilterTitle
                filterCount={filterCount}
                setIsFilterListVisiable={setIsFilterListVisiable}
                isFilterListVisiable={isFilterListVisiable}
            />
            <FilterMenu
                isFilterListVisiable={isFilterListVisiable}
                currentQueryParams={currentQueryParams}
                setCurrentQueryParams={setCurrentQueryParams}
                handleOnChangeInput={handleOnChange}
                setIsFilterListVisiable={setIsFilterListVisiable}
                resetQueryParams={resetQueryParams}
                minDateCalendar={minDateCalendare}
            />
            <FilterSearch
                currentQueryParams={currentQueryParams}
                handleOnChange={handleOnChange}
            />
            {Object.values(queryParams).length > 1 ? (
                <FilterChips
                    currentQueryParams={currentQueryParams}
                    resetQueryParams={resetQueryParams}
                    deleteQueryParam={deleteQueryParam}
                />
            ) : ""}

        </form>
    )
};

export default SearchForm;