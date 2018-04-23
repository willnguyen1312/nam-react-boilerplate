import * as React from "react";
import * as Loadable from "react-loadable";
import { Route, Router, Switch } from "react-router";
import { Provider } from "rebass";

import { LoadingComponent } from "./components/Loading";
import { NotFoundPage } from "./components/NotFoundPage/Loadable";
import { history } from "./helpers/history";

const RebassProvider = Provider as any;

const AsyncAppComponent = Loadable({
  loader: () => import("./App"),
  loading: LoadingComponent
});

export default class Routes extends React.Component {
  render() {
    return (
      <RebassProvider>
        <Router history={history}>
          <Switch>
            <Route exact={true} path="/" component={AsyncAppComponent} />
            <Route path="" component={NotFoundPage} />
          </Switch>
        </Router>
      </RebassProvider>
    );
  }
}
