import styles from './SearchForm.module.scss';
import { useEffect, useState } from 'react';

const SearchForm = ({ queryParams, setQueryParams }) => {
    const [currentQueryParams, setCurrentQueryParams] = useState(queryParams);
    const [filterCount, setFilterCount] = useState(null);
    useEffect(() => {
        setFilterCount(Object.keys(queryParams).length - 1);
        // console.log(queryParams);
    }, [queryParams]);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        if (currentQueryParams.find === "") delete currentQueryParams.find
        else currentQueryParams.find = encodeURIComponent(currentQueryParams.find)
        setQueryParams({ ...currentQueryParams });
    };
    const handleOnChange = ({ target }) => {
        setCurrentQueryParams({ ...currentQueryParams, [target.name]: target.value });
    };

    return (
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <div className={styles.formTitle}>
                <h1 className={styles.title}>Новости</h1>
                <button className={`btn-text primary ${styles.filterButton}`} type='button'>
                    <i className="bi bi-sliders"></i>
                    Фильтры
                    {filterCount > 0 ? <span className={styles.filterButtonCounter}>{filterCount}</span> : ""}
                </button>
            </div>
            <div className={styles.formSearch}>
                <input
                    value={currentQueryParams.find ? decodeURIComponent(currentQueryParams.find) : ""}
                    className={styles.textInput}
                    type="text"
                    name="find"
                    placeholder="Текст для поиска"
                    onChange={handleOnChange}
                />
                <button type="submit" className="btn-text filled secondary">Найти</button>
            </div>
        </form>
    )
};

export default SearchForm;