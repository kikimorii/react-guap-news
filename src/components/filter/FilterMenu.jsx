import { useEffect, useState } from "react";
import styles from "./FilterMenu.module.scss";
import Select from "react-select";

const FILTER_LINKS = {
    nodesids: "https://api.guap.ru/news/v2/get-active-nodes",
    categoriesids: "https://api.guap.ru/news/v2/get-reg-categories",
    tagsids: "https://api.guap.ru/news/v2/get-reg-tags",
    targetsids: "https://api.guap.ru/news/v2/get-reg-targets",
};

const FiltreMenu = ({ isFilterListVisiable, currentQueryParams, setCurrentQueryParams }) => {
    const [selectsContent, setSelectsContent] = useState({});

    useEffect(() => {
        Promise.all(Object.entries(FILTER_LINKS).map(([key, url]) => {
            fetch(url)
                .then((response) => response.json())
                .then((loadedData) => {
                    const selectContent = () => loadedData.map((elem) => {
                        const option = {};
                        option.value = String(elem.id);
                        option.label = elem.title;
                        return option;
                    });
                    setSelectsContent((prev) => ({ ...prev, [key]: selectContent() }))
                });
        }));
    }, []);

    const defaultValues = (key, options) => {
        const defaultOptions = options.filter((elem) => {
            if (currentQueryParams[key]) {
                if (currentQueryParams[key].includes(elem.value)) {
                    return elem;
                }
            }
        });
        return defaultOptions;
    }

    const handlerOnChange = (key, data) => {
        const values = data.map((elem) => elem.value);
        const newCurrentQueryParams = {...currentQueryParams, [key]: values};
        if (values.length === 0) delete newCurrentQueryParams[key]
        setCurrentQueryParams(newCurrentQueryParams);
    }

    return (
        <div className={styles.filterWrapper}>
            <div className={`${styles.filterList} ${isFilterListVisiable ? styles.visiable : ""}`}>
                <h6>Добавить фильтры</h6>
                {selectsContent.length !== 0 
                    ? (Object.entries(selectsContent).map(([key, options]) => (
                    <Select
                        key={key}
                        options={options}
                        isMulti
                        defaultValue={defaultValues(key, options)}
                        onChange={(data) => handlerOnChange(key, data)}
                    />
                ))) : ""}
                <button className={"btn-text secondary filled"} type="submit">Применить</button>
            </div>
        </div>
    );
};

export default FiltreMenu;