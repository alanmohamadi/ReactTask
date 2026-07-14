export const toEnglishNumber = (str: string) => {
    return str?.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
};