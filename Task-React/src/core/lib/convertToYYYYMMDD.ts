export const convertToYYYYMMDD = (date: any): string => {
    if (!date) return "";

    if (typeof date === 'object') {
        if (date.year && date.month && date.day) {
            return `${date.year}${String(date.month).padStart(2, '0')}${String(date.day).padStart(2, '0')}`;
        }
        if (date instanceof Date) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}${month}${day}`;
        }
        console.error("نوع تاریخ ناشناخته:", date);
        return "";
    }

    if (typeof date === 'string') {
        const numbers = date.replace(/\D/g, '');
        if (numbers.length === 8) return numbers;
        const parts: any = date.split(/[\/\-]/);
        if (parts.length === 3) {
            return `${parts[0]}${parts[1].padStart(2, '0')}${parts[2].padStart(2, '0')}`;
        }
        return numbers;
    }

    return "";
};