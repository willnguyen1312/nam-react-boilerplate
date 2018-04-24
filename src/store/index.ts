import { routerMiddleware } from "react-router-redux";
import { applyMiddleware, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import * as Immutable from "seamless-immutable";

import { history } from "../helpers/history";
import createReducer from "../reducers";

/**
 * Create the store with dynamic reducers
 */

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  const middlewares = [sagaMiddleware, routerMiddleware(history)];

  const enhancers = [applyMiddleware(...middlewares)];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window === "object" &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
          // Prevent recomputing reducers for `replaceReducer`
          shouldHotReload: false
        })
      : compose;
  /* eslint-enable */

  const store = createStore(
    createReducer(),
    Immutable(initialState),
    composeEnhancers(...enhancers)
  );

  // Extensions
  (store as any).runSaga = sagaMiddleware.run;
  (store as any).injectedReducers = {}; // Reducer registry
  (store as any).injectedSagas = {}; // Saga registry

  // Make reducers hot reloadable, see http://mxs.is/googmo
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept("../reducers", () => {
      store.replaceReducer(createReducer((store as any).injectedReducers));
    });
  }

  return store;
}
