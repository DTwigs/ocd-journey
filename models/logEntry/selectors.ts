import {
  differenceInCalendarDays,
  isSameDay,
  startOfDay,
  subDays,
} from "date-fns";
import { make } from "./creation";
import type LogEntry from "./type";

export const hasTodaysLog = (entries: LogEntry[]): boolean =>
  entries.length > 0
    ? isSameDay(new Date(), getLastEntry(entries).date)
    : false;

export const getTodaysLog = (entries: LogEntry[]): LogEntry =>
  hasTodaysLog(entries)
    ? entries[0]
    : { date: startOfDay(new Date()).toISOString(), entry: { resists: 0 } };

export const getLastEntry = (entries: LogEntryp[]): LogEntry =>
  entries[entries.length - 1];

export const addResistToTodaysLog = (entries: LogEntry[]): LogEntry[] => {
  let updatedEntries = [...entries];
  if (hasTodaysLog(updatedEntries)) {
    getLastEntry(updatedEntries).stats.resists += 1;
  } else {
    updatedEntries = fillMissingLogs(updatedEntries);
    updatedEntries.push(
      make(startOfDay(new Date()).toISOString(), {
        resists: 1,
      }),
    );
  }

  return updatedEntries;
};

// If the user hasnt been in the app in a while there will be blank days
// that needed to be added in to the array of LogEntries
export const fillMissingLogs = (entries: LogEntry[]): LogEntry[] => {
  const filledEntries = [...entries];
  const lastEntry: LogEntry = getLastEntry(filledEntries);

  if (!lastEntry) {
    return filledEntries;
  }

  const logGapCount: number = differenceInCalendarDays(
    new Date(),
    lastEntry.date,
  );
  const toFill: number = logGapCount - 1;

  if (toFill <= 0) {
    return filledEntries;
  }

  for (let i = toFill; i > 0; i--) {
    filledEntries.push(
      make(startOfDay(subDays(new Date(), i)).toISOString(), {
        resists: 0,
      }),
    );
  }

  return filledEntries;
};
