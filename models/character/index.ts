import * as reducers from "./reducers";
import * as actions from "./actions";
import * as selectors from "./selectors";

export const characterModel = {
  ...reducers,
  ...actions,
  ...selectors,
};
