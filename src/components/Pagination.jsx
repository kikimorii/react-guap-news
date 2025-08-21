import styles from './Pagination.module.scss';
import { getPageNumbers } from '../utils/utils';
const handleClick = () => {
    document.querySelector(".header").scrollIntoView();
}

const Pagination = ({ currentPage, totalPages, setNumberOfPage, numberOfPage }) => {
    const isFirst = numberOfPage === 1;
    const isLast = numberOfPage === totalPages;
    const numbers = getPageNumbers(numberOfPage, totalPages);

    return (
        <ul className={styles.list}>
            <li className={`${isFirst ? styles.hidden : ""}`}>
                <button className={styles.button} onClick={() => {
                    setNumberOfPage(1);
                    handleClick();
                }}>
                    <i className="bi bi-chevron-double-left"></i>
                </button>
            </li>
            {numbers.map((number, idx) => (
                <li key={idx}>
                    <button
                        className={`${styles.button} ${numberOfPage === number ? styles.buttonActive : ''} ${!Boolean(Number(number)) ? styles.buttonDots : ''}`}
                        disabled={!Boolean(Number(number)) || numberOfPage === number}
                        onClick={() => {
                            setNumberOfPage((number));
                            handleClick();
                        }}
                    >
                        {number}
                    </button>
                </li>
            ))}
            <li className={`${isLast ? styles.hidden : ""}`}>
                <button className={styles.button} onClick={() => {
                    setNumberOfPage(totalPages);
                    handleClick();
                }}>
                    <i className="bi bi-chevron-double-right"></i>
                </button>
            </li>
        </ul>
    )
};

export default Pagination;