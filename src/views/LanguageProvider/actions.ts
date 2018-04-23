import { CHANGE_LOCALE } from "./constants";

/*
 *
 * LanguageProvider actions
 *
 */

export function changeLocale(languageLocale: string) {
  return {
    locale: languageLocale,
    type: CHANGE_LOCALE
  };
}
