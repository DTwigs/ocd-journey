import { format, subDays } from "date-fns";
import { formatDateKey } from "./selectors";
import { INTERVALS } from "@/constants/Dates";
import type {
  ChartDatum,
  LogEntries,
  LogEntryCoreStatName,
  LogEntryType,
} from "./type";

// weekly, monthly, 3 month, year, all
// mood, energy, anxiety, resists
// precise, average?

export const getChartDataRange = (
  entries: LogEntries,
  statName: LogEntryCoreStatName,
  numberOfRecords: number = INTERVALS.WEEK,
  startIndex: number = 0,
): ChartDatum<LogEntryType>[] => {
  let endIndex = entries.size;
  if (numberOfRecords > 0) {
    endIndex = startIndex + numberOfRecords - 1;
    // const maxEndIndex = startIndex + numberOfRecords - 1;
    // endIndex = maxEndIndex > entries.size ? entries.size : maxEndIndex;
  }

  const arrOfKeys = [];
  for (let i = endIndex; i >= startIndex; i--) {
    arrOfKeys.push(formatDateKey(subDays(new Date(), i)));
  }

  const minMaxArray = [];
  const chartData = arrOfKeys.map((dateKey: string) => {
    const value = entries.get(dateKey)?.[statName] ?? 0;
    minMaxArray.push(value);
    return {
      label: format(dateKey, "EEEEEE"),
      value,
    };
  });

  return { chartData, max: Math.max(...minMaxArray) };
};
