import { isSameDay, formatISO } from "date-fns";
import type LogEntry from "./type";

export const findTodaysEntry = (entries: LogEntry[]): LogEntry => {
  const today = new Date();

  const todaysEntry = entries.find((entry) => isSameDay(today, entry.date));

  if (!todaysEntry) {
    return {
      date: formatISO(new Date()),
      entry: {
        resists: 1,
      },
    };
  }

  return todaysEntry;
};

export const addResistToTodaysEntry = (entries: LogEntry[]): LogEntry[] => {
  const today = new Date();

  return entries.map((entry) => {
    if (isSameDay(today, entry.date)) {
      return {
        ...entry,
        entry: {
          ...entry.entry,
          resists: entry.resists + 1,
        },
      };
    }
    return entry;
  });
};
