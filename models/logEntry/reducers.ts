import { addResistToTodaysEntry } from "./selectors";
import { ADD_RESIST } from "./actions";
import type State from "../state/type";

type LogEntryAction = { type: "ADD_RESIST"; action: null };

export const initialState = {
  logEntries: [],
};

export const reducer = (state: State, action: LogEntryAction): State => {
  switch (action.type) {
    case ADD_RESIST: {
      const updatedLogEntries = addResistToTodaysEntry(state.logEntries);

      return {
        ...state,
        logEntries: updatedLogEntries,
      };
    }
    default:
      return {
        state,
      };
  }
};
