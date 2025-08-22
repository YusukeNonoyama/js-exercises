// date-fns
import { compareAsc, format } from "date-fns";
import { DateTime } from 'luxon';
import dayjs from 'dayjs';

format(new Date(2014, 1, 11), "yyyy-MM-dd");
//=> '2014-02-11'

const dates = [
  new Date(1995, 6, 2),
  new Date(1987, 1, 11),
  new Date(1989, 6, 10),
];
dates.sort(compareAsc);
console.log(dates);
const nowFNS = new Date();
console.log("date-fns: ", nowFNS);

// 結果：
// [
//   1987-02-10T15:00:00.000Z,
//   1989-07-09T15:00:00.000Z,
//   1995-07-01T15:00:00.000Z
// ]
// 2025-08-15T10:20:06.603Z

// Luxon
const nowLuxon = DateTime.now();
console.log("Luxon: ", nowLuxon);

// 結果
// DateTime { ts: 2025-08-15T19:20:06.603+09:00, zone: Asia/Tokyo, locale: en-US }

// Day.js
const nowDayjs = dayjs();
console.log("Dayjs: ", nowDayjs.format());

// 結果
// 2025-08-15T19:20:06+09:00

console.log("import.meta: ", import.meta.url);

const pathA = new URL(`test/index.js`, import.meta.url);
console.log(pathA);