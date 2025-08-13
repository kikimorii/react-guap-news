import NewsListItem from "./NewsListItem";
import styles from './NewsList.module.scss';
import ErrorMsg from "./ErrorMsg";
import Pagination from "./Pagination";

const NewsList = ({ newsList, isLoading, numberOfPage, setNumberOfPage, pagePagination }) => {
    return (
        <div className={styles.wrapper} id="newsWrapper">
            {
                isLoading ? (
                    <div className={styles.loaderWrapper}>
                        <div className={styles.loader}></div>
                    </div>
                ) : newsList.length ? (
                    <>
                        <ul className={styles.list}>
                            {Object.values(newsList).map((newsContent) => (
                                <NewsListItem key={newsContent.id} {...newsContent} />
                            ))}
                        </ul>
                        <Pagination {...pagePagination} setNumberOfPage={setNumberOfPage} numberOfPage={numberOfPage} />
                    </>
                ) : (
                    <ErrorMsg />
                )
            }
        </div>
    );
};

export default NewsList;