import { addResistToTodaysLog, addStatsToTodaysLog } from "./selectors";
import { ADD_RESIST, SAVE_LOG } from "./actions";
// import { make } from "./creation";
import type { State } from "../state/type";
// import { startOfDay, subDays } from "date-fns";
import * as db from "@/db";
import type { LogEntryStats } from "./type";

// const mockData = [
//   make(startOfDay(subDays(new Date(), 5).toISOString()), {
//     resists: 2,
//   }),
//   make(startOfDay(subDays(new Date(), 4).toISOString()), {
//     resists: 1,
//   }),
// ];

export const initialState = {
  logEntries: [], //[...mockData],
};

type LogEntryReducers = {
  [ADD_RESIST]: (state: State) => State;
  [SAVE_LOG]: (state: State, value: LogEntryStats) => State;
};

export const reducers: LogEntryReducers = {
  [ADD_RESIST]: (state: State) => {
    const updatedLogEntries = addResistToTodaysLog(state.logEntries);
    const newState = {
      ...state,
      logEntries: updatedLogEntries,
    };
    db.setLogEntries(updatedLogEntries);

    return newState;
  },
  [SAVE_LOG]: (state: State, value: LogEntryStats) => {
    const updatedLogEntries = addStatsToTodaysLog(state.logEntries, value);
    const newState = {
      ...state,
      logEntries: updatedLogEntries,
    };
    db.setLogEntries(updatedLogEntries);

    return newState;
  },
};
