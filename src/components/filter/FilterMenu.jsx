import { useEffect, useState } from "react";
import styles from "./FilterMenu.module.scss";
import Select from "react-select";
import selectStyles from './FilterMenuSelectStyles';

const FILTER_LINKS = [
    ["nodes", "Узлы", "https://api.guap.ru/news/v2/get-active-nodes"],
    ["categoriesids", "Рубрики", "https://api.guap.ru/news/v2/get-reg-categories"],
    ["tagsids", "Тэги", "https://api.guap.ru/news/v2/get-active-tags"],
    ["targetsids", "Участники", "https://api.guap.ru/news/v2/get-reg-targets"],
]

const FiltreMenu = ({ isFilterListVisiable, currentQueryParams, setCurrentQueryParams, handleOnChangeInput, setIsFilterListVisiable, resetQueryParams }) => {
    const [selectsContent, setSelectsContent] = useState({});

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        Promise.all(FILTER_LINKS.map(([key, placeholder, url]) => {
            fetch(url)
                .then((response) => response.json())
                .then((loadedData) => {
                    const selectContent = () => loadedData.map((elem) => {
                        const option = {};
                        option.value = String(elem.id);
                        option.label = elem.title;
                        return option;
                    });
                    setSelectsContent((prev) => ({ ...prev, [key]: { options: selectContent(), "placeholder": placeholder } }))
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
        const newCurrentQueryParams = { ...currentQueryParams, [key]: values };
        if (values.length === 0) delete newCurrentQueryParams[key]
        setCurrentQueryParams(newCurrentQueryParams);
    }

    return (
        <div className={styles.filterWrapper}>
            <div className={`${isFilterListVisiable ? styles.filterBackground : ""}`} onClick={() => setIsFilterListVisiable(false)}></div>
            <div className={`${styles.filterList} ${isFilterListVisiable ? styles.visiable : ""}`}>
                <div className={`${styles.filterMenuTitleWrapper} ${isMobile ? styles.filterMenuTitleWrapperMobile : ""}`}>
                    <h6 className={styles.filterMenuTitleText}>{isMobile ? "Фильры и поиск" : "Добавить фильтры"}</h6>
                    {(isMobile) && (Object.entries(currentQueryParams).length > 1) ? (
                        <button className="btn-text secondary" onClick={resetQueryParams}>Сбросить</button>
                    ) : ""}
                </div>
                <div className={styles.selectsWrapper}>
                    {selectsContent.length !== 0
                        ? (Object.entries(selectsContent).map(([key, { options, placeholder }]) => (
                            <Select
                                key={key}
                                options={options}
                                isMulti
                                value={defaultValues(key, options)}
                                onChange={(data) => handlerOnChange(key, data)}
                                placeholder={placeholder}
                                menuPlacement={isMobile ? "top" : "bottom"}
                                menuShouldBlockScroll={true}
                                styles={selectStyles}
                                isSearchable={false}
                            />
                        ))) : ""}
                    {isMobile ?
                        (<input
                            value={currentQueryParams.find ? decodeURIComponent(currentQueryParams.find) : ""}
                            className={styles.input}
                            type="text"
                            name="find"
                            placeholder="Текст для поиска"
                            onChange={handleOnChangeInput}
                        />) : ""}
                    <button className={"btn-text secondary filled"} type="submit">Применить</button>
                </div>
            </div>
        </div>
    );
};

export default FiltreMenu;