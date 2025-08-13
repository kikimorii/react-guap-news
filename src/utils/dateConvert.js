export default (date) => {
    const tempDate = new Date(date);
    const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    };
    const result = tempDate.toLocaleDateString('ru-RU', options);
    
    return result;
}