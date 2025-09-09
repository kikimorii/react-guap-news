import styles from './FilterChips.module.scss';
import { useState, useEffect } from 'react';

const FILTER_LINKS = [
    ["nodesids", "https://api.guap.ru/news/v2/get-active-nodes"],
    ["categoriesids", "https://api.guap.ru/news/v2/get-reg-categories"],
    ["tagsids", "https://api.guap.ru/news/v2/get-active-tags"],
    ["targetsids", "https://api.guap.ru/news/v2/get-reg-targets"],
]

const FilterChips = ({ currentQueryParams, resetQueryParams, deleteQueryParam }) => {
    const [selectsContent, setSelectsContent] = useState({});
    useEffect(() => {
        Promise.all(
            FILTER_LINKS.map(([key, url]) =>
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => [
                        key,
                        data.map((elem) => ({
                            value: String(elem.id),
                            label: elem.title,
                        })),
                    ])
            )
        ).then((results) => {
            setSelectsContent(Object.fromEntries(results));
        });
    }, []);

    const filterParams = { ...currentQueryParams };
    delete filterParams.page;
    delete filterParams.find;
    delete filterParams.begin;
    delete filterParams.end;

    const chipsContent = [];

    Object.entries(filterParams).forEach(([title, ids]) => {
        ids.forEach((id) => {
            const option = selectsContent[title]?.find((elem) => elem.value == id);
            if (option) {
                chipsContent.push({
                    id: `${title}-${id}`,
                    title: option.label,
                });
            }
        });
    });

    return (
        <div className={styles.chipsWrapper}>
            <button type='button' onClick={resetQueryParams} className={`btn btn-text secondary ${styles.chips}`}>
                Сбросить все
            </button>
            {chipsContent.map((chips) => (
                <button
                    key={chips.id}
                    type="button"
                    data-id={chips.id}
                    className={`btn btn-text primary ${styles.chips} ${styles.chipsTag}`}
                    onClick={() => deleteQueryParam(chips.id)}
                >
                    {chips.title}
                    <img src="/react-guap-news/close.svg" alt="" />
                </button>
            ))}
        </div>
    )
}

export default FilterChips;