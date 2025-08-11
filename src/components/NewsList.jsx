import NewsListItem from "./NewsListItem";
import styles from './NewsList.module.scss';

const NewsList = ({ newsList }) => {
    return (
        <ul className={styles.list}>
            {Object.values(newsList).map((newsContent) => (
                <NewsListItem key={newsContent.id} {...newsContent} />
            ))}
        </ul>
    )
};

export default NewsList;