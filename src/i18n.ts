import { addLocaleData } from "react-intl";
import * as enLocaleData from "react-intl/locale-data/en";
import * as deLocaleData from "react-intl/locale-data/vi";

import * as enTranslationMessages from "./translations/en.json";
import * as viTranslationMessages from "./translations/vi.json";

// import { DEFAULT_LOCALE } from "../app/containers/App/constants";
export const DEFAULT_LOCALE = "en";

/**
 * i18n.js
 *
 * This will setup the i18n language files and locale data for your app.
 *
 */
addLocaleData(enLocaleData);
addLocaleData(deLocaleData);

export const appLocales = ["en", "de"];

export const formatTranslationMessages = (
  locale: string,
  messages: any
): any => {
  const defaultFormattedMessages =
    locale !== DEFAULT_LOCALE
      ? formatTranslationMessages(DEFAULT_LOCALE, enTranslationMessages)
      : {};
  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage =
      !messages[key] && locale !== DEFAULT_LOCALE
        ? defaultFormattedMessages[key]
        : messages[key];
    return Object.assign(formattedMessages, { [key]: formattedMessage });
  }, {});
};

export const translationMessages = {
  en: formatTranslationMessages("en", enTranslationMessages),
  vi: formatTranslationMessages("de", viTranslationMessages)
};
