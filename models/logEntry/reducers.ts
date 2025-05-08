import { addResistToTodaysLog } from "./selectors";
import { ADD_RESIST } from "./actions";
// import { make } from "./creation";
import type State from "../state/type";
// import { startOfDay, subDays } from "date-fns";
import * as db from "@/db";

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
};
