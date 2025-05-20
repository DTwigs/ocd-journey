import { logEntryModel } from "@/models/logEntry";
import { subDays } from "date-fns";

const { formatDateKey, makeStats } = logEntryModel;

const mockData = new Map();

const PERIOD_LENGTH = 7;

let fac2Counter = 0;

for (let i = 110; i > 5; i--) {
  if (fac2Counter > 28) {
    fac2Counter = 0;
  }
  fac2Counter++;
  mockData.set(
    formatDateKey(subDays(new Date(), i)),
    makeStats({
      resists: Math.floor(Math.random() * 10),
      mood: Math.floor(Math.random() * 10),
      energy: Math.floor(Math.random() * 10),
      anxiety: Math.floor(Math.random() * 10),
      factor1: Math.random() < 0.5,
      factor2: fac2Counter < PERIOD_LENGTH,
    }),
  );
}

export const mockLogEntries = mockData;
