import { differenceInCalendarDays, subDays, format } from "date-fns";
import { KEY_DATE_FORMAT } from "@/constants/Dates";
import { makeStats } from "./creation";
import type { LogEntry, LogEntryStats } from "./type";

export const formatDateKey = (date: Date): string =>
  format(date, KEY_DATE_FORMAT);

export const hasTodaysLog = (entries: LogEntries): boolean => {
  const today = formatDateKey(new Date());
  return entries.has(today);
};

// return [date, LogEntryStats] as an array
export const getLastEntry = (
  entries: LogEntries,
): Array<string | LogEntryStats> => Array.from(entries).pop();

export const addResistToTodaysLog = (entries: LogEntries): LogEntries => {
  const today = formatDateKey(new Date());
  let updatedEntries = new Map<string, LogEntryStats>(entries);

  if (updatedEntries.has(today)) {
    const todaysEntry: LogEntryStats = updatedEntries.get(today);
    updatedEntries.set(today, {
      ...todaysEntry,
      resists: todaysEntry.resists >= 0 ? todaysEntry.resists + 1 : 1,
    });
  } else {
    updatedEntries = fillMissingLogs(updatedEntries);
    updatedEntries.set(today, makeStats({ resists: 1 }));
  }

  return updatedEntries;
};

export const addStatsToTodaysLog = (
  entries: LogEntries,
  stats: LogEntryStats,
): LogEntries => {
  let updatedEntries = new Map(entries);
  const today = formatDateKey(new Date());

  if (updatedEntries.has(today)) {
    const todaysEntry: LogEntryStats = updatedEntries.get(today);
    updatedEntries.set(today, {
      ...todaysEntry,
      ...stats,
    });
  } else {
    updatedEntries = fillMissingLogs(updatedEntries);
    updatedEntries.set(
      today,
      makeStats({
        resists: 0,
        ...stats,
      }),
    );
  }

  return updatedEntries;
};

// If the user hasnt been in the app in a while there will be blank days
// that needed to be added in to the array of LogEntries
export const fillMissingLogs = (entries: LogEntries): LogEntries => {
  const filledEntries = new Map(entries);
  const lastEntry: LogEntry = getLastEntry(filledEntries);

  if (!lastEntry) {
    return filledEntries;
  }

  const [lastEntryDate] = lastEntry; // the first item in the last entry array is the date key
  const logGapCount: number = differenceInCalendarDays(
    formatDateKey(new Date()),
    lastEntryDate,
  );
  const toFill: number = logGapCount - 1;

  if (toFill <= 0) {
    return filledEntries;
  }

  for (let i = toFill; i > 0; i--) {
    filledEntries.set(
      formatDateKey(subDays(new Date(), i)),
      makeStats({ resists: 0 }),
    );
  }

  return filledEntries;
};
