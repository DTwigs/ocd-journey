export type LogEntryJournalStats = {
  mood?: number;
  energy?: number;
  anxiety?: number;
};

export type LogEntryFactors = {
  factor1?: boolean;
  factor2?: boolean;
};

export type LogEntryStats = LogEntryJournalStats &
  LogEntryFactors & { resists?: number };

export type LogEntries = Map<string, LogEntryStats>;

export type LogEntryStatName = "mood" | "energy" | "anxiety" | "resists";

export type ChartDatum<T> = {
  label: string | null;
  value: T;
  frontColor: string | null;
  labelWidth: number | null;
  factor2?: boolean;
  factor1?: boolean;
  barBorderTopLeftRadius: number;
  barBorderTopRightRadius: number;
  barBorderBottomLeftRadius: number;
  barBorderBottomRightRadius: number;
};

export type LineDatum = { value: number; dateKey: string };
