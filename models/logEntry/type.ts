import type { barDataItem } from "react-native-gifted-charts";

export type LogEntryJournalStats = {
  mood?: number | null;
  energy?: number | null;
  anxiety?: number | null;
};

export type LogEntryFactors = {
  factor1?: boolean | undefined;
  factor2?: boolean | undefined;
};

export type LogEntryNotes = {
  notes?: string | null;
};

export type LogEntryStats = LogEntryJournalStats &
  LogEntryFactors &
  LogEntryNotes & { resists?: number | null };

export type LogEntries = Map<string, LogEntryStats>;

export type LogEntryStatName = "mood" | "energy" | "anxiety" | "resists";

export type LineDatum = { value: number; dateKey: string };

export type ChartDatum = barDataItem & LogEntryFactors;
