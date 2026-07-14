const formatDateToNumber = (date: string): string => {
    if (!date) return "";
    return date.replace(/\//g, "");
};
export default formatDateToNumber;