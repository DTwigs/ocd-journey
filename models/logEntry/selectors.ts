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
  let hasTodaysEntry = false;

  const newEntries = entries.map((log) => {
    if (isSameDay(today, log.date)) {
      hasTodaysEntry = true;
      return {
        ...log,
        entry: {
          ...log.entry,
          resists: log.entry.resists + 1,
        },
      };
    }
    return entry;
  });

  // Adds an entry for todays date if one doesnt already exist.
  if (!hasTodaysEntry) {
    newEntries.push({
      date: formatISO(new Date()),
      entry: {
        resists: 1,
      },
    });
  }

  return newEntries;
};
