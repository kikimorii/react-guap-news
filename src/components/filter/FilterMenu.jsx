import styles from "./FilterMenu.module.scss"

const FiltreMenu = ({isFilterListVisiable}) => {
    return (
        <div className={styles.filterWrapper}>
            <div className={`${styles.filterList} ${isFilterListVisiable ? styles.visiable : ""}`}>
                <h6>Добавить фильтры</h6>
                <button className={"btn-text secondary filled"} type="button">Применить</button>
            </div>
        </div>
    );
};

export default FiltreMenu;