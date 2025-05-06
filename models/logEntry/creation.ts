import type { LogEntry, LogEntryStats } from "./type";

export const make = (date: string, statsOverrides: LogEntryStats): LogEntry => {
  return {
    date,
    stats: {
      resists: 0,
      ...statsOverrides,
    },
  };
};
