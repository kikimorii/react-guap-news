import styles from './FilterTitle.module.scss';

const FiltreTitle = ({filterCount, setIsFilterListVisiable, isFilterListVisiable}) => {
    return (
        <div className={styles.title}>
            <h1>Новости</h1>
            <button className={`btn-text primary ${styles.button}`} type='button' onClick={() => setIsFilterListVisiable(!isFilterListVisiable)}>
                <i className="bi bi-sliders"></i>
                Фильтры
                {filterCount > 0 ? <span className={styles.buttonCounter}>{filterCount}</span> : ""}
            </button>
        </div>
    );
};

export default FiltreTitle;