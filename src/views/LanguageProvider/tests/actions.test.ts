import { changeLocale } from "../actions";

import { CHANGE_LOCALE } from "../constants";

describe("LanguageProvider actions", () => {
  describe("Change Local Action", () => {
    it("has a type of CHANGE_LOCALE", () => {
      const expected = {
        locale: "de",
        type: CHANGE_LOCALE
      };
      expect(changeLocale("de")).toEqual(expected);
    });
  });
});
