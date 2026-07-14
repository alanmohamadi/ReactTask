export const getUnitWidth = (unitCount: number) => {
    if (unitCount === 1) return "col-span-4";
    if (unitCount === 2) return "col-span-2";
    if (unitCount === 3) return "col-span-1";
    if (unitCount === 4) return "col-span-1";
    if (unitCount === 5) return "col-span-1";
    if (unitCount === 6) return "col-span-1";
    return "col-span-1";
};
export const getRowLayout = (unitCount: number) => {
    if (unitCount === 1) return [1];
    if (unitCount === 2) return [2];
    if (unitCount === 3) return [3];
    if (unitCount === 4) return [4];
    if (unitCount === 5) return [4, 1];
    if (unitCount === 6) return [4, 2];
    if (unitCount === 7) return [4, 3];
    if (unitCount === 8) return [4, 4];
    return [4]; // fallback
};

// تابع تعیین عرض هر واحد بر اساس تعداد واحدهای همون ردیف
export const getUnitWidthInRow = (rowSize: number, totalUnits: number = 4) => {
    if (rowSize === 1) return "col-span-4";
    if (rowSize === 2) return "col-span-2";
    if (rowSize === 3) return "col-span-1"; // 3 تا در 4 ستون
    if (rowSize === 4) return "col-span-1";
    return "col-span-1";
};

// تابع تعیین جایگاه شروع برای وسط‌چین شدن
export const getColumnStart = (rowSize: number, index: number) => {
    if (rowSize === 1) return "md:col-start-2"; // وسط برای 1 واحد
    if (rowSize === 2) return ""; // خودش دو طرف میشه
    if (rowSize === 3) {
        if (index === 0) return "md:col-start-1";
        if (index === 1) return "md:col-start-2";
        if (index === 2) return "md:col-start-3";
    }
    return "";
};