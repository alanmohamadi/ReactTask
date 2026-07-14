interface FlatCharge {
    flatId: number;
    unitName: string;
    amount: number;
}

interface ChargeInfo {
    title: string;
    amount: number;
}

// تابع اصلی برای ساخت description
export const buildFlatDescription = (
    flatId: number,
    unitName: string,
    allChargesList: any[] // لیست همه شارژها
): string => {
    // 1. جمع آوری تمام مبالغ این واحد از همه شارژها
    const unitCharges: ChargeInfo[] = [];

    allChargesList.forEach((charge: any) => {
        const flatAmount = charge.chargeFlatAmounts?.find(
            (flat: any) => flat.flatId === flatId
        );

        if (flatAmount && flatAmount.amount > 0) {
            unitCharges.push({
                title: charge.title,
                amount: Math.round(flatAmount.amount) // گرد کردن به عدد صحیح
            });
        }
    });

    // اگر هیچ شارژی نداشت
    if (unitCharges.length === 0) {
        return `${unitName} - هیچ هزینه‌ای ندارد`;
    }

    // 2. محاسبه جمع کل
    const totalAmount = unitCharges.reduce((sum, item) => sum + item.amount, 0);

    // 3. ساخت متن برای هر شارژ
    const chargesText = unitCharges
        .map((item) => `${item.title}: ${item.amount.toLocaleString()} ریال`)
        .join(" - ");

    // 4. برگرداندن متن نهایی
    return `${unitName} - ${chargesText} | جمع کل: ${totalAmount.toLocaleString()} ریال`;
};

// تابع برای ساخت description فقط برای یک شارژ خاص (اگر نیاز دارید)
export const buildSingleChargeDescription = (
    unitName: string,
    chargeTitle: string,
    chargeAmount: number
): string => {
    return `${unitName} - ${chargeTitle}: ${Math.round(chargeAmount).toLocaleString()} ریال`;
};