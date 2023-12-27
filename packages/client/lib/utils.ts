import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EXPIRE } from "./constants";
import {
  intervalToDuration,
  formatDuration,
  type FormatDurationOptions,
} from "date-fns";

export const cn = (...classNames: ClassValue[]) => {
  return twMerge(clsx(classNames));
};

export const getExpirationSeconds = (exp: string) => {
  switch (exp) {
    case EXPIRE.BURN_AFTER_READ:
      return -1;
    case EXPIRE.ONE_MINUTE:
      return 60;
    case EXPIRE.ONE_HOUR:
      return 60 * 60;
    case EXPIRE.ONE_DAY:
      return 60 * 60 * 24;
    case EXPIRE.ONE_WEEK:
    default:
      return 60 * 60 * 24 * 7;
  }
};

export const getDuration = (
  startDate: string | Date,
  endDate: string | Date,
  options?: FormatDurationOptions,
) => {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  const interval = intervalToDuration({ start, end });
  const duration = formatDuration(interval, options);
  return duration;
};
