import * as React from "react";
import * as Loadable from "react-loadable";
import { Route, Router, Switch } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import { Provider } from "rebass";
import { LoadingComponent } from "./components/Loading";
import { NotFoundPage } from "./components/NotFoundPage/Loadable";
import { history as browserhistory } from "./helpers/history";
import configureStore from "./store";

// Create redux store with history
const initialState = {};

export const store = configureStore(initialState);

const RebassProvider = Provider as any;
const history = syncHistoryWithStore(browserhistory, store);

const AsyncAppComponent = Loadable({
  loader: () => import("./views/App"),
  loading: LoadingComponent
});

const AsyncHomeComponent = Loadable({
  loader: () => import("./views/HomePage"),
  loading: LoadingComponent
});

export default class Routes extends React.Component {
  render() {
    return (
      <RebassProvider>
        <Router history={history}>
          <Switch>
            <Route exact={true} path="/" component={AsyncAppComponent} />
            <Route path="/home" component={AsyncHomeComponent} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </RebassProvider>
    );
  }
}
