import * as Immutable from "seamless-immutable";

import { CHANGE_LOCALE } from "../constants";
import languageProviderReducer from "../reducer";

describe("languageProviderReducer", () => {
  it("returns the initial state", () => {
    expect(languageProviderReducer(undefined, {})).toEqual(
      Immutable({
        locale: "en"
      })
    );
  });

  it("changes the locale", () => {
    expect(
      languageProviderReducer(undefined, { type: CHANGE_LOCALE, locale: "de" })
    ).toEqual({
      locale: "de"
    });
  });
});
