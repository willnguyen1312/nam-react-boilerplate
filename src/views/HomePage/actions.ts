import {
  CHANGE_TITLE,
  CHANGE_TITLE_FAILED,
  CHANGE_TITLE_SUCCESS
} from "./constants";

/*
 *
 * HomePage actions
 *
 */

export function changeTitle() {
  return {
    type: CHANGE_TITLE
  };
}

export function changeTitleSuccess(title: string) {
  return {
    title,
    type: CHANGE_TITLE_SUCCESS
  };
}

export function changeTitleFailed(error: Error) {
  return {
    error,
    type: CHANGE_TITLE_FAILED
  };
}
