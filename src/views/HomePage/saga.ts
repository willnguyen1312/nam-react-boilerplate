import { delay } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import { changeTitleSuccess } from "./actions";
import { CHANGE_TITLE } from "./constants";

// import { setLoading, setInfo, setError, resetUI } from 'containers/App/actions';
// import isTruthy from 'helpers/isTruthy';
// import isFalsy from 'helpers/isFalsy';
// import isImmutable from 'helpers/isImmutable';

export function* changeTitle() {
  yield call(delay, 1000);
  yield put(changeTitleSuccess(`Modified title ${Date.now().toString()}`));
}

export default function* homePageSaga() {
  yield takeLatest(CHANGE_TITLE, changeTitle);
}
