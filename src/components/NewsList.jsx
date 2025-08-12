import NewsListItem from "./NewsListItem";
import styles from './NewsList.module.scss';
import ErrorMsg from "./ErrorMsg";

const NewsList = ({ newsList }) => {
    console.log(newsList.length);
    if (newsList.length) {
        return (
            <ul className={styles.list}>
                {Object.values(newsList).map((newsContent) => (
                    <NewsListItem key={newsContent.id} {...newsContent} />
                ))}
            </ul>
        )
    } else {
        return <ErrorMsg />
    }
};

export default NewsList;