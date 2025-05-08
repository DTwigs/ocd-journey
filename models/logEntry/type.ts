export type LogEntryStats = {
  resists?: number;
  mood?: number;
  energy?: number;
  anxiety?: number;
  exercise?: boolean;
  monthlyCycle?: boolean;
};

export type LogEntry = {
  date: string;
  stats: LogEntryData;
};
