import * as dayjs from "dayjs";
import * as isBetween from "dayjs/plugin/isBetween";
import * as isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import * as relativeTime from "dayjs/plugin/relativeTime";
import * as utc from "dayjs/plugin/utc";
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
export const DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
export const DATE_FORMAT = "YYYY-MM-DD";
export const DateFormatRegexp = /^\d\d\d\d\-\d\d\-\d\d$/;
export const DateFormatErrorMessage = "date format must be YYYY-MM-DD";
export const AppStartedAt = dayjs();
export { dayjs };

export function now(outputFormat: string = DATETIME_FORMAT): string {
  return dayjs().format(outputFormat);
}

export function isValidTime(
  value: any,
  format: string = DATETIME_FORMAT
): boolean {
  return dayjs(value, format).format(format) === value;
}

export function formatStartISO(datetime: string): string {
  return `${datetime}T00:00:00.000Z`;
}

export function formatEndISO(datetime: string): string {
  return `${datetime}T23:59:59.999Z`;
}

export function timeFormat(value: any, format: string = DATETIME_FORMAT) {
  return dayjs(value).format(format);
}

export function numToTz(value: number): string {
  let symbol = value < 0 ? "-" : "+";
  return `${symbol}${Math.abs(value).toString().padStart(2, "0")}:00`;
}
