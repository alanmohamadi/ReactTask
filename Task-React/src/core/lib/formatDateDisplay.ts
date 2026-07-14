import moment from "jalali-moment";
const formatDisplayDate = (dateStr: string): string => {
    if (!dateStr) return "";
    try {
        if (dateStr.includes("/")) {
            const m = moment(dateStr, "jYYYY/jM/jD");
            if (m.isValid()) {
                return m.format("jYYYY/jMM/jDD");
            }
        }
        if (dateStr.includes("-")) {
            const m = moment(dateStr, "YYYY-M-D");
            if (m.isValid()) {
                return m.format("jYYYY/jMM/jDD");
            }
        }
    } catch (e) { }
    return dateStr;
};
export default formatDisplayDate