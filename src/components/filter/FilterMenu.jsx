import { useEffect, useState } from "react";
import styles from "./FilterMenu.module.scss";
import Select from "react-select";
import selectStyles from './FilterMenuSelectStyles';
import DatePicker, { DateObject } from "react-multi-date-picker";
import "./DatePicker.scss";
import "react-multi-date-picker/styles/layouts/mobile.css"

const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const months = [
    "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
    "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
];

const FILTER_LINKS = [
    ["nodesids", "Узлы", "https://api.guap.ru/news/v2/get-active-nodes"],
    ["categoriesids", "Рубрики", "https://api.guap.ru/news/v2/get-reg-categories"],
    ["tagsids", "Тэги", "https://api.guap.ru/news/v2/get-active-tags"],
    ["targetsids", "Участники", "https://api.guap.ru/news/v2/get-reg-targets"],
];

const FiltreMenu = ({ isFilterListVisiable, currentQueryParams, setCurrentQueryParams, handleOnChangeInput, setIsFilterListVisiable, resetQueryParams }) => {
    const [selectsContent, setSelectsContent] = useState({});
    const [beginDate, setBeginDate] = useState(currentQueryParams.begin || "");
    const [endDate, setEndDate] = useState(currentQueryParams.end || "");
    const [isMobile, setIsMobile] = useState(false);
    const [range, setRange] = useState([
        beginDate[0] ? new DateObject({ date: beginDate[0], format: "YYYY-MM-DD" }) : null,
        endDate[0] ? new DateObject({ date: endDate[0], format: "YYYY-MM-DD" }) : null,
    ]);

    useEffect(() => {
        setBeginDate(currentQueryParams.begin || "");
        setEndDate(currentQueryParams.end || "");
    }, [currentQueryParams.begin, currentQueryParams.end]);

    useEffect(() => {
        setRange([
            beginDate ? new DateObject({ date: beginDate, format: "YYYY-MM-DD" }) : null,
            endDate ? new DateObject({ date: endDate, format: "YYYY-MM-DD" }) : null,
        ]);
    }, [beginDate, endDate]);

    useEffect(() => {
        const checkScreen = () => setIsMobile(window.innerWidth < 768);
        checkScreen();
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen);
    }, []);

    useEffect(() => {
        Promise.all(
            FILTER_LINKS.map(([key, placeholder, url]) =>
                fetch(url)
                    .then((response) => response.json())
                    .then((loadedData) => {
                        const selectContent = loadedData.map((elem) => ({
                            value: String(elem.id),
                            label: elem.title,
                        }));
                        setSelectsContent((prev) => ({
                            ...prev,
                            [key]: { options: selectContent, placeholder },
                        }));
                    })
            )
        );
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
    };

    const handlerOnChange = (key, data) => {
        const values = data.map((elem) => elem.value);
        const newCurrentQueryParams = { ...currentQueryParams, [key]: values };
        if (values.length === 0) delete newCurrentQueryParams[key];
        setCurrentQueryParams(newCurrentQueryParams);
    };

    const handleDateChange = (values) => {
        const [start, end] = values;

        const newBegin = start ? start.format("YYYY-MM-DD") : "";
        const newEnd = end ? end.format("YYYY-MM-DD") : "";

        setBeginDate(newBegin);
        setEndDate(newEnd);

        const newParams = { ...currentQueryParams };
        if (newBegin) newParams.begin = newBegin;
        if (newEnd) newParams.end = newEnd;
        setCurrentQueryParams(newParams);
    };

    const handleDateClean = () => {
        setRange([null, null]);

        const newParams = { ...currentQueryParams };
        delete newParams.begin;
        delete newParams.end;

        setCurrentQueryParams(newParams);
    };

    return (
        <div className={styles.filterWrapper}>
            <div
                className={`${isFilterListVisiable ? styles.filterBackground : ""}`}
                onClick={() => setIsFilterListVisiable(false)}
            ></div>
            <div className={`${styles.filterList} ${isFilterListVisiable ? styles.visiable : ""}`}>
                <div className={`${styles.filterMenuTitleWrapper} ${isMobile ? styles.filterMenuTitleWrapperMobile : ""}`}>
                    <h6 className={styles.filterMenuTitleText}>{isMobile ? "Фильры и поиск" : "Добавить фильтры"}</h6>
                    {Object.entries(currentQueryParams).length > 1 ? (
                        <button type='button' className="btn-text secondary" onClick={resetQueryParams}>Сбросить</button>
                    ) : ""}
                </div>
                <div className={styles.selectsWrapper}>
                    <div className={styles.datePickerWrapper}>
                        <DatePicker
                            className={isMobile ? "rmdp-mobile" : ""}
                            mobileLabels={{
                                OK: "Принять",
                                CANCEL: "Закрыть",
                            }}
                            inputClass={styles.datePickerInput}
                            range
                            rangeHover
                            weekDays={weekDays}
                            months={months}
                            dateSeparator=" — "
                            arrowStyle={{ display: "none" }}
                            placeholder="Дата"
                            format="YYYY-MM-DD"
                            calendarPosition="bottom-center"
                            value={range}
                            onChange={handleDateChange}
                        />
                        {
                            beginDate && (
                                <button
                                    onClick={() => handleDateClean()}
                                    className={styles.datePickerReset}
                                    type="button"
                                >
                                    <svg height="20" width="20" viewBox="0 0 20 20">
                                        <path d="M14.348 14.849c-0.469 0.469-1.229 0.469-1.697 0l-2.651-3.030-2.651 3.029c-0.469 0.469-1.229 0.469-1.697 0-0.469-0.469-0.469-1.229 0-1.697l2.758-3.15-2.759-3.152c-0.469-0.469-0.469-1.228 0-1.697s1.228-0.469 1.697 0l2.652 3.031 2.651-3.031c0.469-0.469 1.228-0.469 1.697 0s0.469 1.229 0 1.697l-2.758 3.152 2.758 3.15c0.469 0.469 0.469 1.229 0 1.698z"></path>
                                    </svg>
                                </button>
                            )
                        }
                    </div>
                    {selectsContent.length !== 0 && (
                        Object.entries(selectsContent).map(([key, { options, placeholder }]) => (
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
                        ))
                    )}
                    {isMobile && (<input
                        value={currentQueryParams.find ? decodeURIComponent(currentQueryParams.find) : ""}
                        className={styles.input}
                        type="text"
                        name="find"
                        placeholder="Текст для поиска"
                        onChange={handleOnChangeInput}
                    />)}
                    <button className={"btn-text secondary filled"} type="submit">Применить</button>
                </div>
            </div>
        </div>
    );
};

export default FiltreMenu;
