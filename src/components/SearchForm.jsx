import styles from './SearchForm.module.scss';
import { useState } from 'react';

const SearchForm = ({ queryParams, setQueryParams }) => {
    const [currentQueryParams, setCurrentQueryParams] = useState(queryParams);

    const handleOnSubmit = (event) => {
        event.preventDefault();
        setQueryParams({...currentQueryParams, find: encodeURIComponent(currentQueryParams.find)});
    };
    const handleOnChange = ({ target }) => {
        setCurrentQueryParams({ ...currentQueryParams, [target.name]: target.value });
    };

    return (
        <form className={styles.form} onSubmit={handleOnSubmit}>
            <input
                value={currentQueryParams.find ? decodeURIComponent(currentQueryParams.find) : ""}
                className={styles.textInput}
                type="text"
                name="find"
                placeholder="Текст для поиска"
                onChange={handleOnChange}
            />
            <button type="submit" className="btn-text filled secondary">Найти</button>
        </form>
    )
};

export default SearchForm;