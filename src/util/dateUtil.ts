import dayjs from "dayjs";
import "dayjs/locale/ja";

export const DEFAULT_DATE_CODE_FORMAT = "YYYYMMDD";
export const DEFAULT_TIME_CODE_FORMAT = "HHmm";
export const DEFAULT_DATETIME_FORMAT = "YYYYMMDDHHmm";
export const DEFUALT_LOCALE = "ja";

export enum DateTimeDisplayFormat {
    YYYYMMDDHHmmssJa = "YYYY年MM月DD日 (dd) HH:mm:ss",
    YYYYMMDDHHmmss = "YYYY/MM/DD HH:mm:ss",
    YYYYMMDDHHmmJa = "YYYY年MM月DD日 HH:mm",
    YYYYMMDDdd = "YYYY/MM/DD (dd)",
    YYYYMMDDddJa = "YYYY年MM月DD日(dd)",
    YYYYMMDD = "YYYY/MM/DD",
    YYYYMMDDHy = "YYYY-MM-DD" /* Hyphen */,
    YYYYMMDDJa = "YYYY年MM月DD日",
    YYYYJa = "YYYY年",
    MMDDddJa = "MM月DD日(dd)",
    MDddJa = "M月D日 (dd)",
    MMDDJa = "MM月DD日",
    HHmm = "HH:mm",
}

const format = (
    fromStr: string | undefined,
    fromFormat: string,
    toFormat: string,
    locale: string
): string => dayjs(fromStr, fromFormat).locale(locale).format(toFormat);

/**
 * 日付文字列を別のフォーマットの日付文字列に変換する
 * @param dateStr 変換したい日付文字列
 * @param toFormat 変換後の日付文字列のフォーマット。記法はdayjs準拠
 * @param options.fromFormat 変換したい日付文字列のフォーマット。記法はdayjs準拠。デフォルトは DEFAULT_DATE_CODE_FORMAT = "YYYYMMDD"
 * @param options.locale ロケール。デフォルトは"ja"
 */
export const formatDate = (
    dateStr: string | undefined,
    toFormat: string,
    options?: { fromFormat?: string; locale?: string }
): string =>
    format(
        dateStr,
        options?.fromFormat ?? DEFAULT_DATE_CODE_FORMAT,
        toFormat,
        options?.locale ?? DEFUALT_LOCALE
    );

/**
 * 日付文字列に指定した日数を減算した日付文字列を生成する。フォーマットは変換前のまま
 * @param dateStr 変換したい日付文字列
 * @param days 減算日数
 * @param options.fromFormat 変換したい日付文字列のフォーマット。記法はdayjs準拠。デフォルトは DEFAULT_DATE_CODE_FORMAT = "YYYYMMDD"
 */
export const subtractDays = (
    dateStr: string | undefined,
    days: number,
    options?: { fromFormat?: string }
): string =>
    dayjs(dateStr, options?.fromFormat ?? DEFAULT_DATE_CODE_FORMAT)
        .subtract(days, "day")
        .format(options?.fromFormat ?? DEFAULT_DATE_CODE_FORMAT);

/**
 * 第1引数と第2引数の日付の差を返す。
 * @param minuendDateStr 引かれる側の日付文字列
 * @param subtrahendDateStr 引く側の日付文字列
 * @param options.fromFormat 変換したい日付文字列のフォーマット。記法はdayjs準拠。デフォルトは DEFAULT_DATE_CODE_FORMAT = "YYYYMMDD"
 */
export const diffInDays = (
    minuendDateStr: string | undefined,
    subtrahendDateStr: string | undefined,
    options?: { fromFormat?: string; locale?: string }
): number =>
    dayjs(minuendDateStr, options?.fromFormat ?? DEFAULT_DATE_CODE_FORMAT).diff(
        dayjs(
            subtrahendDateStr,
            options?.fromFormat ?? DEFAULT_DATE_CODE_FORMAT
        ),
        "day"
    );

export const getCurrentDate = (toFormat: string) => {
    return formatDate(new Date().toString(), toFormat);
};

/**
 * date型の変数からyyyymmdd文字列を得る
 *
 * @param {date} - 任意のDateインスタンス
 * @returns {string} - yyyymmdd文字列
 */
export const dateToString = (date: Date) => {
    const dateObj = dateToObj(date);
    return `${dateObj.year}${dateObj.month}${dateObj.day}`;
};

/**
 * @private
 */
const _convertDoubleDigits = (number: number) => {
    let num = String(number);
    if (num.length === 1) {
        num = "0" + num;
    }
    return num;
};

/**
 * javascriptのDate型を日付情報オブジェクトに変換する
 * @param {Date} date javascriptのDate
 * @returns {Object} 日付情報オブジェクト
 */
const dateToObj = (date: Date) => {
    return {
        year: String(date.getFullYear()),
        month: _convertDoubleDigits(date.getMonth() + 1),
        day: _convertDoubleDigits(date.getDate()),
        hour: _convertDoubleDigits(date.getHours()),
        minute: _convertDoubleDigits(date.getMinutes()),
        second: _convertDoubleDigits(date.getSeconds()),
    };
};
