import styles from './ErrorMsg.module.scss';

const ErrorMsg = () => {
    return (
        <img className={styles.img} src={'https://src.guap.ru/svg/errors/404.ru.svg'} alt="Error 404. Невалидный запрос" />
    )
};

export default ErrorMsg;