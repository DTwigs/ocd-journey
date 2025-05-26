import { get, remove, set } from "./db";
import type { LogEntries } from "@/models/logEntry/type";

const LOG_ENTRIES = "LOG_ENTRIES";

export const removeLogEntriesData = async () => {
  return Promise.all([remove(LOG_ENTRIES)]);
};

export const getLogEntries = async (): Promise<LogEntries> => {
  const data: string = await get(LOG_ENTRIES);

  return new Map(JSON.parse(data));
};

export const setLogEntries = async (data: LogEntries): Promise<void> => {
  return set(LOG_ENTRIES, JSON.stringify(Array.from(data)));
};
