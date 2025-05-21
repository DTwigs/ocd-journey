import { addResistToTodaysLog, addStatsToTodaysLog } from "./selectors";
import { ADD_RESIST, SAVE_LOG } from "./actions";
import type { State } from "../state/type";
import * as db from "@/db";
import type { LogEntryStats } from "./type";

export const initialState = {
  logEntries: new Map<string, LogEntryStats>(),
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
