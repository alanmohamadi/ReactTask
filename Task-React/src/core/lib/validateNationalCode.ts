import { toEnglishNumber } from "./toEnglishNumberYup.js";

export const validateNationalCode = (code: string): boolean => {
    let nationalCode = toEnglishNumber(code).replace(/\D/g, '');
    if (nationalCode.length !== 10) return false;
    if (!/^\d{10}$/.test(nationalCode)) return false;
    const allDigitsSame = /^(\d)\1{9}$/.test(nationalCode);
    if (allDigitsSame) {
        return false;
    }
    const checkDigit = parseInt(nationalCode.charAt(9));
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        const digit = parseInt(nationalCode.charAt(i));
        sum += digit * (10 - i);
    }
    const remainder = sum % 11;
    if (remainder < 2) {
        return checkDigit === remainder;
    } else {
        return checkDigit === (11 - remainder);
    }
};