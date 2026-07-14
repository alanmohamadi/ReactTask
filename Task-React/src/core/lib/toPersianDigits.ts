export const toPersianDigits = (num: number | string): string => {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return num?.toString()?.split("").map((digit) => persianDigits[parseInt(digit)]).join("");
};