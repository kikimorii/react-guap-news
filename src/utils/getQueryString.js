export default (queryParams) => {
    let queryString = '';
    Object.entries(queryParams).forEach((elem, index) => {
        queryString += `${index === 1 ? "&" : ""}${elem[0]}=${elem[1].toString()}`;
    })
    return queryString;
}