export default () => {
    const queryParams = {};
    const queryArray = window.location.search.slice(1).split('&');
    queryArray.forEach((queryElem) => {
        const [queryTitle, queryValues] = queryElem.split("=")
        if (queryTitle === 'page') {
            queryParams[queryTitle] = queryValues.split(',')[0] || 1;
        }
        else queryParams[queryTitle] = queryValues.split(',');
    });
    if (!queryParams.page) {
        queryParams.page = 1;
    }

    return queryParams;
}