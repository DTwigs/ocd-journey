export type LogEntryStats = {
  resists?: number;
  mood?: number;
  energy?: number;
  anxiety?: number;
  exercise?: boolean;
  monthlyCycle?: boolean;
};

export type LogEntries = Map<string, LogEntryStats>;
