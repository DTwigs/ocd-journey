import * as reducers from "./reducers";
import * as actions from "./actions";
import * as creation from "./creation";
import * as selectors from "./selectors";
import * as chartHelpers from "./chartHelpers";

export const logEntryModel = {
  ...reducers,
  ...actions,
  ...creation,
  ...selectors,
  ...chartHelpers,
};
