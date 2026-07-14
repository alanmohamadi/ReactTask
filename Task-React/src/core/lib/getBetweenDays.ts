

import moment from "jalali-moment";

export function getDaysBetween(start: string, end: string): string[] {
    const days: string[] = [];

    if (start.trim() && end.trim()) {
        let current = moment(start, "jYYYY/jMM/jDD");
        const last = moment(end, "jYYYY/jMM/jDD");

        while (current.isSameOrBefore(last, "day")) {
            days.push(current.format("jYYYY/jMM/jDD"));
            current.add(1, "day");
        }
    }

    return days;
}


