import { getDaysOfMonth, getDayOfWeek, getDaysExcludeWeekend, getFirstDayOfLastMonth } from "./index.ts";

describe("check getDayOfMonth() function", () => {
    const testArr1: [number, number, number][] = [
        [2025, 1, 31],
        [2025, 2, 28],
        [2025, 3, 31],
        [2025, 4, 30],
        [2025, 5, 31],
        [2025, 6, 30],
        [2025, 7, 31],
        [2025, 8, 31],
        [2025, 9, 30],
        [2025, 10, 31],
        [2025, 11, 30],
        [2025, 12, 31],
        [2024, 2, 29],
        [2026, 2, 28],
        [2027, 2, 28],
        [2028, 2, 29],
        [2029, 2, 28],
    ]
    test.each(testArr1)("getDayOfMonth(%s, %s) : %s days", (y, d, result) => {
        expect(getDaysOfMonth(y, d)).toBe(result);
    });
})

describe("check getDaysExcludeWeekend() function", () => {
    const testArr2: [string, string, number][] = [
        ["2025-06-05", "2025-06-12", 6],
        ["2025-06-05", "2025-06-13", 7],
        ["2025-06-05", "2025-06-14", 7],    // 6/14 sun
        ["2025-06-05", "2025-06-15", 7],    // 6/15 sat
        ["2025-06-05", "2025-06-16", 8],
        ["2025-06-05", "2025-06-17", 9],
        ["2025-06-05", "2025-06-18", 10],
        ["2025-06-05", "2026-06-18", 271],
        ["2025-06-18", "2025-06-05", 10],   // 2つ目の引数の方が早い日付の場合
        ["2025-06-05", "2025-06-05", 1],   // 同じ日
    ]
    const testArr2Error: [string, string, ErrorConstructor][] = [
        ["2025-06-05", "day", Error],
        ["day", "2025-06-12", Error],
        ["day1", "day2", Error],
    ]
    test.each(testArr2)("getDaysExcludeWeekend(%s, %s) : %s days", (date1, date2, result) => {
        expect(getDaysExcludeWeekend(date1, date2)).toBe(result);
    });
    test.each(testArr2Error)("getDaysExcludeWeekend(%s, %s) : %s days", (date1, date2, error) => {
        expect(() => getDaysExcludeWeekend(date1, date2)).toThrow(error);
    });
})

describe("check getDayOfWeek() function", () => {
    const testArr3: [string, string, string][] = [
        ["2025-06-11", "en-US", "Wed"],
        ["2025-06-12", "en-US", "Thu"],
        ["2025-06-13", "en-US", "Fri"],
        ["2025-06-14", "en-US", "Sat"],
        ["2025-06-15", "en-US", "Sun"],
        ["2025-06-16", "en-US", "Mon"],
        ["2025-06-17", "en-US", "Tue"],
        ["2025-06-18", "en-US", "Wed"],
        ["2025-06-11", "ja-JP", "水"],
        ["2025-06-12", "ja-JP", "木"],
        ["2025-06-13", "ja-JP", "金"],
        ["2025-06-14", "ja-JP", "土"],
        ["2025-06-15", "ja-JP", "日"],
        ["2025-06-16", "ja-JP", "月"],
        ["2025-06-17", "ja-JP", "火"],
        ["2025-06-18", "ja-JP", "水"],
        ["2025-06-11", "fr-FR", "mer."],
        ["2025-06-11", "locale", "Wed"],    // localeのデフォルトで出力される
    ]
    const testArr3Error: [string, string, ErrorConstructor][] = [
        ["day", "en-US", Error],
    ]
    test.each(testArr3)("getDayOfWeek(%s, %s) : %s days", (date, locale, result) => {
        expect(getDayOfWeek(date, locale)).toBe(result);
    });
    test.each(testArr3Error)("getDayOfWeek(%s, %s) : %s", (date, locale, error) => {
        expect(() => getDayOfWeek(date, locale)).toThrow(error);
    });
})

describe("check getFirstDayOfLastMonth() function", () => {
    const now = new Date();
    expect(getFirstDayOfLastMonth()).toEqual(new Date(now.getFullYear(), now.getMonth() -2, 1, 0, 0, 0));
});