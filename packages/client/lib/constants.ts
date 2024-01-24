import siteConfig from "./siteConfig";

export const EXPIRE = {
  BURN_AFTER_READ: "B",
  ONE_MINUTE: "1m",
  ONE_HOUR: "1H",
  ONE_DAY: "1D",
  ONE_WEEK: "1W",
} as const;

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url;

export const MAX_TEXT_LENGTH = 150_000;
export const ID_SLUG_REGEX = /^[A-Za-z0-9]+(?:[_-][A-Za-z0-9]+)*$/;
export const ID_MIN_LENGTH = 3;
export const ID_MAX_LENGTH = 80;

