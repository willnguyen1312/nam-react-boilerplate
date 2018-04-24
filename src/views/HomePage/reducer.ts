/*
 *
 * HomePage reducer
 *
 */

import * as Immutable from "seamless-immutable";
import { CHANGE_TITLE_SUCCESS } from "./constants";

const initialState = Immutable({
  title: ""
});

function homePageReducer(state = initialState, action: any) {
  switch (action.type) {
    case CHANGE_TITLE_SUCCESS:
      return state.set("title", action.title);
    default:
      return state;
  }
}

export default homePageReducer;
