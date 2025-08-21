import styles from './FilterSearch.module.scss';

const FilterSearch = ({currentQueryParams, handleOnChange}) => {
    return (
        <div className={styles.search}>
            <input
                value={currentQueryParams.find ? decodeURIComponent(currentQueryParams.find) : ""}
                className={styles.input}
                type="text"
                name="find"
                placeholder="Текст для поиска"
                onChange={handleOnChange}
            />
            <button type="submit" className="btn-text filled secondary">Найти</button>
        </div>
    );
};

export default FilterSearch;