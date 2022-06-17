import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';
export const DateFormatRegexp = /^\d\d\d\d\-\d\d\-\d\d$/;
export const DateFormatErrorMessage = 'date format must be YYYY-MM-DD';
export const AppStartedAt = dayjs();
export { dayjs };

export function now(outputFormat: string = DATETIME_FORMAT): string {
  return dayjs().format(outputFormat);
}

export function isValidTime(
  value: any,
  format: string = DATETIME_FORMAT,
): boolean {
  return dayjs(value, format).format(format) === value;
}

export function timeFormat(value: any, format: string = DATETIME_FORMAT) {
  return dayjs(value).format(format);
}
