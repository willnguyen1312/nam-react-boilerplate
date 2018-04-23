import { DEFAULT_LOCALE } from "./../../i18n";
/*
 *
 * LanguageProvider reducer
 *
 */

import * as Immutable from "seamless-immutable";

import { CHANGE_LOCALE } from "./constants";

const initialState = Immutable({
  locale: DEFAULT_LOCALE
});

function languageProviderReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state.set("locale", action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
