import { dateConvert } from '../utils/utils';
import styles from './NewsListItem.module.scss';

const NewsListItem = ({ id, title, abstract, mediaCatalog, date }) => {
    const dateOnPage = dateConvert(date);
    const photoURL = `https://media.guap.ru/${mediaCatalog}/_title.jpg?s=lg`;

    return (
        <li key={id} className={styles.wrapper}>
            <a href="#" className={styles.link}>
                <img className={styles.img} src={photoURL} alt={title} />
                <div className={styles.text}>
                    <div className={styles.mainText}>
                        <h5 className={styles.title}>{title}</h5>
                        <p className={styles.description}>{abstract}</p>
                    </div>
                    <small className={styles.date}>{dateOnPage}</small>
                </div>
            </a>
        </li>
    )
};

export default NewsListItem;