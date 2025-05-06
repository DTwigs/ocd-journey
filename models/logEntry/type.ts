export type LogEntryStats = {
  resists?: number;
  mood?: number;
  energy?: number;
  anxiety?: number;
};

export type LogEntry = {
  date: string;
  stats: LogEntryData;
};
