import { addResistToTodaysLog } from "./selectors";
import { ADD_RESIST } from "./actions";
import { make } from "./creation";
import type State from "../state/type";
import { startOfDay, subDays } from "date-fns";

const mockData = [
  make(startOfDay(subDays(new Date(), 5).toISOString()), {
    resists: 2,
  }),
  make(startOfDay(subDays(new Date(), 4).toISOString()), {
    resists: 1,
  }),
];

export const initialState = {
  logEntries: [...mockData],
};

type LogEntryActions = {
  [ADD_RESIST]: (state: State) => State;
};

export const actions: LogEntryActions = {
  [ADD_RESIST]: (state: State) => {
    const updatedLogEntries = addResistToTodaysLog(state.logEntries);

    return {
      ...state,
      logEntries: updatedLogEntries,
    };
  },
};
