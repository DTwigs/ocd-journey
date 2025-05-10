import { get, remove, set } from "./db";
import type { LogEntries } from "@/models/logEntry/type";

const LOG_ENTRIES = "LOG_ENTRIES";

export const removeLogEntriesData = async () => {
  return Promise.all([remove(LOG_ENTRIES)]);
};

export const getLogEntries = async (): LogEntries => {
  const data: LogEntries = await get(LOG_ENTRIES);

  return new Map(JSON.parse(data));
};

export const setLogEntries = async (data: LogEntries): LogEntries => {
  return set(LOG_ENTRIES, JSON.stringify(Array.from(data)));
};
