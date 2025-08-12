import NewsListItem from "./NewsListItem";
import styles from './NewsList.module.scss';
import ErrorMsg from "./ErrorMsg";

const NewsList = ({ newsList, isLoading }) => {
    return (
        isLoading ? (
            <div className={styles.loaderWrapper}>
                <div className={styles.loader}></div>
            </div>
        ) : newsList.length ? (
            <ul className={styles.list}>
                {Object.values(newsList).map((newsContent) => (
                    <NewsListItem key={newsContent.id} {...newsContent} />
                ))}
            </ul>
        ) : (
            <ErrorMsg />
        )
    );
};

export default NewsList;