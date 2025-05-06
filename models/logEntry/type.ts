export type LogEntry = {
  date: string;
  entry: {
    resists?: number;
    mood?: number;
    energy?: number;
    anxiety?: number;
  };
};
