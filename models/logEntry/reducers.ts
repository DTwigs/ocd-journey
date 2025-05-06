import { addResistToTodaysEntry } from "./selectors";
import { ADD_RESIST } from "./actions";
import type State from "../state/type";

export const initialState = {
  logEntries: [],
};

type LogEntryActions = {
  [ADD_RESIST]: (state: State) => State;
};

export const actions: LogEntryActions = {
  [ADD_RESIST]: (state: State) => {
    const updatedLogEntries = addResistToTodaysEntry(state.logEntries);

    return {
      ...state,
      logEntries: updatedLogEntries,
    };
  },
};
