/**
 * Asynchronously loads the component for NotFoundPage
 */
import * as Loadable from "react-loadable";

import { LoadingComponent } from "../Loading";

export const NotFoundPage = Loadable({
  loader: () => import("./index"),
  loading: LoadingComponent
});
