import { format, subDays } from "date-fns";
import { formatDateKey } from "./selectors";
import { INTERVALS } from "@/constants/Dates";
import { tertiary, secondary, primary } from "@/constants/Colors";
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
  }

  const arrOfKeys = [];
  for (let i = endIndex; i >= startIndex; i--) {
    arrOfKeys.push(formatDateKey(subDays(new Date(), i)));
  }

  const minMaxArray = [];
  const chartData = arrOfKeys.map((dateKey: string) => {
    const entry = entries.get(dateKey);
    const value = entry?.[statName] ?? 0;
    minMaxArray.push(value);
    return {
      label: format(dateKey, "EEEEEE"),
      value,
      frontColor: getBarColor(entry),
    };
  });

  return { chartData, max: Math.max(...minMaxArray) };
};

const getBarColor = (entry) => {
  if (!entry) {
    return;
  }
  if (entry.period && entry.exercise) {
    return primary;
  } else if (entry.period) {
    return secondary;
  } else if (entry.exercise) {
    return tertiary;
  }
};
