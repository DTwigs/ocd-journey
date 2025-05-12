export type LogEntryStats = {
  resists?: number;
  mood?: number;
  energy?: number;
  anxiety?: number;
  exercise?: boolean;
  monthlyCycle?: boolean;
};

export type LogEntries = Map<string, LogEntryStats>;

export type LogEntryCoreStatName = "mood" | "energy" | "anxiety" | "resists";

export type LogEntryStatName = LogEntryCoreStatName | "exercise" | "period";

export type ChartDatum<T> = {
  label: string;
  value: T;
  frontColor?: string;
  spacing?: number;
  labelWidth?: number;
  labelTextStyle?: number;
};
