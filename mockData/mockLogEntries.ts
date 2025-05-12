import { logEntryModel } from "@/models/logEntry";
import { subDays } from "date-fns";

const { formatDateKey, makeStats } = logEntryModel;

const mockData = new Map();
mockData.set(formatDateKey(subDays(new Date(), 14)), makeStats({ resists: 7 }));
mockData.set(formatDateKey(subDays(new Date(), 13)), makeStats({ resists: 6 }));
mockData.set(formatDateKey(subDays(new Date(), 12)), makeStats({ resists: 5 }));
mockData.set(formatDateKey(subDays(new Date(), 11)), makeStats({ resists: 4 }));
mockData.set(formatDateKey(subDays(new Date(), 10)), makeStats({ resists: 3 }));
mockData.set(formatDateKey(subDays(new Date(), 9)), makeStats({ resists: 2 }));
mockData.set(formatDateKey(subDays(new Date(), 8)), makeStats({ resists: 1 }));
mockData.set(formatDateKey(subDays(new Date(), 7)), makeStats({ resists: 7 }));
mockData.set(formatDateKey(subDays(new Date(), 6)), makeStats({ resists: 6 }));
mockData.set(formatDateKey(subDays(new Date(), 5)), makeStats({ resists: 5 }));
mockData.set(formatDateKey(subDays(new Date(), 4)), makeStats({ resists: 4 }));

export const mockLogEntries = mockData;
