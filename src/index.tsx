import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "sanitize.css/sanitize.css";

import "./global-styles";
import { translationMessages } from "./i18n";
import registerServiceWorker from "./registerServiceWorker";
import Routes, { store } from "./routes";
import LanguageProvider from "./views/LanguageProvider";

// const history = createHistory();
const MOUNT_NODE = document.getElementById("root") as HTMLElement;

const render = (messages: any) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Routes />
      </LanguageProvider>
    </Provider>,
    MOUNT_NODE
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(["./i18n", "./routes"], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!(window as any).Intl) {
  new Promise(resolve => {
    resolve(import("intl"));
  })
    .then(() =>
      Promise.all([
        require("intl/locale-data/jsonp/en.js"),
        require("intl/locale-data/jsonp/vi.js")
      ])
    )
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

registerServiceWorker();
