import { combineReducers } from "redux";

import languageProviderReducer from "../views/LanguageProvider/reducer";

// import globalReducer from 'containers/App/reducer';
/**
 * Combine all reducers in this file and export the combined reducers.
 */

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers: any = {}) {
  return combineReducers({
    ...injectedReducers,
    // global: globalReducer,
    language: languageProviderReducer
  });
}
