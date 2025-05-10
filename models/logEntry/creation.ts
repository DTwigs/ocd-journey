import type { LogEntryStats } from "./type";

export const makeStats = (statsOverrides: LogEntryStats): LogEntryStats => {
  return {
    resists: 0,
    mood: null,
    energy: null,
    anxiety: null,
    exercise: false,
    monthlyCycle: false,
    ...statsOverrides,
  };
};
