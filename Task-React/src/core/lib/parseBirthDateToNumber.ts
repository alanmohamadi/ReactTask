export const parseBirthDateToNumber = (persianDateString: string) => {
    if (!persianDateString) return null;

    const cleaned = persianDateString.replace(/[\/\-]/g, '');
    return parseInt(cleaned);
};