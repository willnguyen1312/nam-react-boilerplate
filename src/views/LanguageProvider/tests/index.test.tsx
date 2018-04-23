import { mount, shallow } from "enzyme";
import * as React from "react";
import { defineMessages, FormattedMessage } from "react-intl";
import { Provider } from "react-redux";

import { translationMessages } from "../../../i18n";
import configureStore from "../../../store";
import ConnectedLanguageProvider, { LanguageProvider } from "../index";

const messages = defineMessages({
  someMessage: {
    defaultMessage: "This is some default message",
    en: "This is some en message",
    id: "some.id"
  }
});

describe("<LanguageProvider />", () => {
  it("should render its children", () => {
    const children = <h1>Test</h1>;
    const renderedComponent = shallow(
      <LanguageProvider messages={messages} locale="en">
        {children}
      </LanguageProvider>
    );
    expect(renderedComponent.contains(children)).toBe(true);
  });
});

describe("<ConnectedLanguageProvider />", () => {
  let store: any;

  beforeAll(() => {
    store = configureStore({});
  });

  it("should render the default language messages", () => {
    const renderedComponent = mount(
      <Provider store={store}>
        <ConnectedLanguageProvider messages={translationMessages}>
          <FormattedMessage {...messages.someMessage} />
        </ConnectedLanguageProvider>
      </Provider>
    );
    expect(
      renderedComponent.contains(<FormattedMessage {...messages.someMessage} />)
    ).toBe(true);
  });
});
