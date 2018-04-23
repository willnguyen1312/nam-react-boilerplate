import * as Immutable from "seamless-immutable";

import { selectLanguage } from "../selectors";

describe("selectLanguage", () => {
  it("should select the global state", () => {
    const globalState = Immutable({});
    const mockedState = Immutable({
      language: globalState
    });
    expect(selectLanguage(mockedState)).toEqual(globalState);
  });
});
