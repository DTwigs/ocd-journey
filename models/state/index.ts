import * as reducers from "./reducers";
import * as actions from "./actions";

export const stateModel = {
  ...reducers,
  ...actions,
};
