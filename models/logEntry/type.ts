export type LogEntryStats = {
  resists?: number;
  mood?: number;
  energy?: number;
  anxiety?: number;
  factor1?: boolean;
  factor2?: boolean;
};

export type LogEntries = Map<string, LogEntryStats>;

export type LogEntryStatName = "mood" | "energy" | "anxiety" | "resists";

export type ChartDatum<T> = {
  label: string;
  value: T;
  frontColor?: string;
  spacing?: number;
  labelWidth?: number;
  labelTextStyle?: number;
};
