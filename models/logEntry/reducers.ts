import {
  addResistToTodaysLog,
  addStatsToTodaysLog,
  formatDateKey,
} from "./selectors";
import { ADD_RESIST, SAVE_LOG } from "./actions";
import { makeStats } from "./creation";
import type { State } from "../state/type";
import { subDays } from "date-fns";
import * as db from "@/db";
import type { LogEntryStats } from "./type";

const mockData = new Map();
mockData.set(formatDateKey(subDays(new Date(), 5)), makeStats({ resists: 5 }));
mockData.set(formatDateKey(subDays(new Date(), 4)), makeStats({ resists: 4 }));

export const initialState: State = {
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
