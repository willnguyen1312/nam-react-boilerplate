import * as invariant from "invariant";
import { conformsTo, isEmpty, isFunction, isString } from "lodash";

import checkStore from "./checkStore";
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from "./constants";

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT];

const checkKey = (key: string) =>
  invariant(
    isString(key) && !isEmpty(key),
    "(app/utils...) injectSaga: Expected `key` to be a non empty string"
  );

const checkDescriptor = (descriptor: any) => {
  const shape = {
    mode: (mode: any) => isString(mode) && allowedModes.includes(mode),
    saga: isFunction
  };
  invariant(
    conformsTo(descriptor, shape),
    "(app/utils...) injectSaga: Expected a valid saga descriptor"
  );
};

export function injectSagaFactory(store: any, isValid: boolean) {
  return function injectSaga(key: string, descriptor = {}, args: any) {
    if (!isValid) {
      checkStore(store);
    }

    const newDescriptor = {
      ...descriptor,
      mode: (descriptor as any).mode || RESTART_ON_REMOUNT
    };
    const { saga, mode } = newDescriptor as any;

    checkKey(key);
    checkDescriptor(newDescriptor);

    let hasSaga = Reflect.has(store.injectedSagas, key);

    if (process.env.NODE_ENV !== "production") {
      const oldDescriptor = store.injectedSagas[key];
      // enable hot reloading of daemon and once-till-unmount sagas
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel();
        hasSaga = false;
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga, args)
      }; // eslint-disable-line no-param-reassign
    }
  };
}

export function ejectSagaFactory(store: any, isValid: boolean) {
  return function ejectSaga(key: string) {
    if (!isValid) {
      checkStore(store);
    }

    checkKey(key);

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key];
      if (descriptor.mode !== DAEMON) {
        descriptor.task.cancel();
        // Clean up in production; in development we need `descriptor.saga` for hot reloading
        if (process.env.NODE_ENV === "production") {
          // Need some value to be able to detect `ONCE_TILL_UNMOUNT` sagas in `injectSaga`
          store.injectedSagas[key] = "done"; // eslint-disable-line no-param-reassign
        }
      }
    }
  };
}

export default function getInjectors(store: any) {
  checkStore(store);

  return {
    ejectSaga: ejectSagaFactory(store, true),
    injectSaga: injectSagaFactory(store, true)
  };
}
