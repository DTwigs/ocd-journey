import type { LogEntryStats } from "./type";

export const makeStats = (statsOverrides: LogEntryStats): LogEntryStats => {
  return {
    resists: 0,
    mood: null,
    energy: null,
    anxiety: null,
    factor1: false,
    factor2: false,
    notes: null,
    ...statsOverrides,
  };
};
