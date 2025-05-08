import { get, remove, set } from "./db";
import type { LogEntry } from "@/models/logEntry/type";

const LOG_ENTRIES = "LOG_ENTRIES";

export const removeLogEntriesData = async () => {
  return Promise.all([remove(LOG_ENTRIES)]);
};

export const getLogEntries = async (): LogEntry[] => {
  const data: LogEntry[] = await get(LOG_ENTRIES);

  return data;
};

export const setLogEntries = async (data: LogEntry[]): LogEntry[] => {
  return set(LOG_ENTRIES, data);
};
