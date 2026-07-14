import moment from "jalali-moment";

export const isAgeOver18 = (date: string): boolean => {
    if (!date) return false;
    const birthday = moment(date, "jYYYY/jM/jD");
    if (!birthday.isValid()) return false;
    const today = moment();
    let age = today.jYear() - birthday.jYear();
    const monthDiff = today.jMonth() - birthday.jMonth();
    const dayDiff = today.jDate() - birthday.jDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    return age >= 18;
};