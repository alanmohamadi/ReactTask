const numberToWords = (num: number): string => {
    if (num === 0) return "صفر";
    if (isNaN(num) || num < 0) return "";

    const ones = ["", "یک", "دو", "سه", "چهار", "پنج", "شش", "هفت", "هشت", "نه"];
    const teens = ["ده", "یازده", "دوازده", "سیزده", "چهارده", "پانزده", "شانزده", "هفده", "هجده", "نوزده"];
    const tens = ["", "", "بیست", "سی", "چهل", "پنجاه", "شصت", "هفتاد", "هشتاد", "نود"];
    const hundreds = ["", "صد", "دویست", "سیصد", "چهارصد", "پانصد", "ششصد", "هفتصد", "هشتصد", "نهصد"];
    const units = [
        { value: 1000000000000, name: "تریلیون" },
        { value: 1000000000, name: "میلیارد" },
        { value: 1000000, name: "میلیون" },
        { value: 1000, name: "هزار" }
    ];

    const convertLessThanThousand = (n: number): string => {
        if (n === 0) return "";
        
        const h = Math.floor(n / 100);
        const r = n % 100;
        let result = "";
        
        if (h > 0) {
            result += hundreds[h];
        }
        
        if (r > 0) {
            if (result) result += " و ";
            
            if (r < 10) {
                result += ones[r];
            } else if (r < 20) {
                result += teens[r - 10];
            } else {
                const t = Math.floor(r / 10);
                const o = r % 10;
                result += tens[t];
                if (o > 0) {
                    result += " و " + ones[o];
                }
            }
        }
        
        return result;
    };

    let result = "";
    let remaining = num;

    for (const unit of units) {
        const unitValue = Math.floor(remaining / unit.value);
        if (unitValue > 0) {
            const unitText = convertLessThanThousand(unitValue);
            if (result) result += " و ";
            result += `${unitText} ${unit.name}`;
            remaining %= unit.value;
        }
    }

    if (remaining > 0) {
        if (result) result += " و ";
        result += convertLessThanThousand(remaining);
    }

    return result;
};

export const getPriceInWords = (priceInRials: number): string => {
    if (!priceInRials || priceInRials === 0) return "";
    
    const toman = Math.round(priceInRials / 10);
    
    return `${numberToWords(toman)} تومان`;
};