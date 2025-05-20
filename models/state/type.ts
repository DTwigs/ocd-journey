import type { LogEntries } from "../logEntry/type";
import type { Factors } from "../settings/type";

export type State = {
  logEntries: LogEntries;
  settings: {
    factors: Factors;
  };
};
