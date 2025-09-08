function createDate(stringDate: string) {
  const arr = stringDate.split("-").map((s) => Number(s));
  const date = new Date(arr[0], arr[1] - 1, arr[2]);
  if (isNaN(date.getTime())) {
    throw Error(`invalid input: ${stringDate}`);
  }
  // console.log(date);
  // console.log(typeof date);
  return date;
}

// 特定の年と月(1-12)を数値の引数で受け取り、その月の日数を返す関数
export function getDaysOfMonth(year: number, month: number) {
  let d = new Date();
  // 次の月の１日より１日前を取得する（３つ目の引数のdayを0にする）
  // 0 => 1月に対応。setFullYearには次の月の１日より１日前という設定をするから、monthは1-1で加減算なし。
  d.setFullYear(year, month, 0);
  return d.getDate();
}

// 期間の開始日と終了日を'YYYY-MM-DD'形式の日付で二つ引数で受け取り、その期間(開始日と終了日を含む)の土日以外の日数を返す関数
export function getDaysExcludeWeekend(start: string, end: string) {
  let startDate = createDate(start);
  let endDate = createDate(end);
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }
  let targetDay = startDate;
  let targetDayOfWeek = targetDay.getDay(); // 始まりの日の曜日
  const endDayOfWeek = endDate.getDay(); // 終わりの日の曜日

  // 始まりの日から、終わりの日と同じ曜日になるまでの土日を除く日数をカウント（端数分のカウント）
  let countRemainder = 0;
  while (targetDayOfWeek !== endDayOfWeek) {
    if (targetDayOfWeek !== 0 && targetDayOfWeek !== 6) ++countRemainder; // 日曜が0、土曜が6
    targetDay.setDate(targetDay.getDate() + 1);
    targetDayOfWeek = targetDay.getDay();
  }
  // 端数としては同じ曜日までカウントするため追加でもう１つカウント
  if (targetDayOfWeek !== 0 && targetDayOfWeek !== 6) ++countRemainder;

  // targetDayとendDayの差分は、7の倍数で割り切るようになったため、全日数のうち5/7が土日を除く日と計算できる
  const count7daysUnit =
    ((endDate.getTime() - targetDay.getTime()) / (24 * 60 * 60 * 1000)) *
    (5 / 7);
  // 全日数から計算したものと端数カウントを足す
  return count7daysUnit + countRemainder;
}

// 'YYYY-MM-DD'形式の日付とロケールを引数で受け取り、その日の曜日をロケールの形式の文字列で返す関数
export function getDayOfWeek(day: string, locale: string) {
  const date = createDate(day);
  return date.toLocaleDateString(locale, { weekday: "short" });
}

// ローカルのタイムゾーンにおいて先月 1 日 0 時 0 分 0 秒の Date オブジェクトを返す関数。ただし getMonth、setMonth は利用してはいけない。
export function getFirstDayOfLastMonth() {
  const monthMap: { [key: string]: number } = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const now = new Date();
  const monthString = now.toString().split(" ")[1];
  const monthNumber = monthMap[monthString];
  return new Date(now.getFullYear(), monthNumber - 2, 1, 0, 0, 0);
}
