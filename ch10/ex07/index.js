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
console.log(nowFNS);

// Luxon
const nowLuxon = DateTime.now();
console.log(nowLuxon);


// Day.js
const nowDayjs = dayjs();
console.log(nowDayjs.format());  // e.g., 2025-06-01T12:34:56+00:00