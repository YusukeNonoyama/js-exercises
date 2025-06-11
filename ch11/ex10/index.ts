function createDate(stringDate: string) {
    const arr = stringDate.split("-").map((s) => Number(s));
    return new Date(arr[0], arr[1] - 1, arr[2]);
}

// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysOfMonth(year: number, month: number) {
    let d = new Date();
    // 0 => 1月に対応。setFullYearには次の月の１日より１日前という設定をするから、monthは1-1で加減算なし。
    d.setFullYear(year, month, 0);
    return d.getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getDaysExcludeWeekend(start: string, end: string) {
    function countWeekDay(targetDayOfWeek: number, count: number) {
        if (targetDayOfWeek !== 0 && targetDayOfWeek !== 6) {
            return ++count;
        }
        return count;
    }

    const startDate = createDate(start)
    const endDate = createDate(end)

    // 日曜が0、土曜が6
    let targetDay = startDate;
    let targetDayOfWeek = targetDay.getDay();
    let endWeekDay = endDate.getDay();

    // 最初の日から、最後の日の次の曜日になるまでの土日を除く日数をカウント（端数分のカウント）
    let count = 0;
    while (targetDayOfWeek !== endWeekDay) {
        count = countWeekDay(targetDayOfWeek, count);
        targetDay.setDate(targetDay.getDate() + 1);
        targetDayOfWeek = targetDay.getDay();
    }
    count = countWeekDay(targetDayOfWeek, count);

    // 7の倍数で割り切れれば、全日数のうち5/7が土日を除く日と計算できる
    const count7daysUnit = (endDate.getTime() - targetDay.getTime()) / (24 * 60 * 60 * 1000) * (5 / 7)
    // 全日数から計算したものと端数カウントを足す
    return count7daysUnit + count;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getDayOfWeek(day: string, locale: string) {
    const date = createDate(day);
    return date.toLocaleDateString(locale, { weekday: 'short' });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getFirstDayOfLastMonth() {
    const monthMap: { [key: string]: number } = {
        "Jan": 0,
        "Feb": 1,
        "Mar": 2,
        "Apr": 3,
        "May": 4,
        "Jun": 5,
        "Jul": 6,
        "Aug": 7,
        "Sep": 8,
        "Oct": 9,
        "Nov": 10,
        "Dec": 11,
    }

    const now = new Date();
    const monthString = now.toString().split(" ")[1];
    const monthNumber = monthMap[monthString];
    return new Date(now.getFullYear(), monthNumber -2, 1, 0, 0, 0);
}

console.log(getFirstDayOfLastMonth());
console.log(getFirstDayOfLastMonth().toString());

// console.log(getDayOfWeek("2025-06-11", "en-US"));
// console.log(getDayOfWeek("2025-06-11", "fr-FR"));
// console.log(getDayOfWeek("2025-06-11", "ja-JP"));

// console.log(getDaysOfMonth(2025, 1));
// console.log(getDaysOfMonth(2025, 2));
// console.log(getDaysOfMonth(2025, 3));
// console.log(getDaysOfMonth(2025, 4));
// console.log(getDaysOfMonth(2025, 5));
// console.log(getDaysOfMonth(2025, 6));
// console.log(getDaysOfMonth(2025, 7));
// console.log(getDaysOfMonth(2025, 8));
// console.log(getDaysOfMonth(2025, 9));
// console.log(getDaysOfMonth(2025, 10));
// console.log(getDaysOfMonth(2025, 11));
// console.log(getDaysOfMonth(2025, 12));

// console.log(getDaysExcludeWeekend("2025-06-05", "2025-06-12"));
