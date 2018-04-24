import { createSelector } from "reselect";

const selectHomePage = (state: any) => state.homePage;

const selectTitle = () =>
  createSelector(selectHomePage, substate => substate.title);

export { selectTitle };
