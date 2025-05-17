import { logEntryModel } from "@/models/logEntry";
import { subDays } from "date-fns";

const { formatDateKey, makeStats } = logEntryModel;

const mockData = new Map();

const PERIOD_LENGTH = 7;

let periodCounter = 0;

for (let i = 110; i > 5; i--) {
  if (periodCounter > 28) {
    periodCounter = 0;
  }
  periodCounter++;
  mockData.set(
    formatDateKey(subDays(new Date(), i)),
    makeStats({
      resists: Math.floor(Math.random() * 10),
      mood: Math.floor(Math.random() * 10),
      energy: Math.floor(Math.random() * 10),
      anxiety: Math.floor(Math.random() * 10),
      exercise: Math.random() < 0.5,
      period: periodCounter < PERIOD_LENGTH,
    }),
  );
}

export const mockLogEntries = mockData;
