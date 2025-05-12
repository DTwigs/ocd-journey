import { subDays } from "date-fns";
import { formatDateKey } from "./selectors";
import { INTERVALS } from "@/constants/Dates";
import { tertiary, secondary } from "@/constants/Colors";
import { CHART_PROPS_BY_INTERVAL } from "@/constants/Chart";
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
  const chartData = arrOfKeys.map((dateKey: string, index: number) => {
    const entry = entries.get(dateKey);
    const value = entry?.[statName] ?? 0;
    minMaxArray.push(value);
    const [frontColor, gradientColor] = getBarColors(
      entry?.period,
      entry?.exercise,
    );
    return {
      label: CHART_PROPS_BY_INTERVAL[numberOfRecords].format(dateKey, index),
      value,
      labelWidth: CHART_PROPS_BY_INTERVAL[numberOfRecords].labelWidth,
      frontColor,
      gradientColor,
    };
  });

  console.log({ chartData });

  return { chartData, max: Math.max(...minMaxArray) };
};

const getBarColors = (stat1, stat2) => {
  if (stat1 && stat2) {
    return [secondary, tertiary];
  } else if (stat1) {
    return [secondary, secondary];
  } else if (stat2) {
    return [tertiary, tertiary];
  }
  return [null, null];
};

// const getBarFrontColor = (stat1, stat2) => {
//   if (stat1) {
//     return secondary;
//   } else if (stat2) {
//     return tertiary;
//   }
// };

// const getBarGradientColor = (stat1, stat2) => {
//   if (stat1) {
//     return tertiary;
//   } else if (stat2) {
//     return secondary;
//   }
// };
