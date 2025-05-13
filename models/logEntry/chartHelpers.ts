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

const FACTOR_BAR_HEIGHT = 0.3;
const BORDER_RADIUS = 1;

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

    const factorNum = Number(entry?.period ?? 0) + Number(entry?.exercise ?? 0);

    const stacks = [statBar(value, factorNum)];
    if (entry?.period) {
      stacks.push(factorBar(false, factorNum === 0));
    }
    if (entry?.exercise) {
      stacks.push(factorBar(true, true));
    }

    return {
      label: CHART_PROPS_BY_INTERVAL[numberOfRecords].format(dateKey, index),
      stacks,
      labelWidth: CHART_PROPS_BY_INTERVAL[numberOfRecords].labelWidth,
    };
  });

  return { chartData, max: Math.max(...minMaxArray) };
};

const statBar = (value, factorNum) => {
  return {
    value: value > 0 ? value - factorNum * FACTOR_BAR_HEIGHT : value,
    borderBottomLeftRadius: BORDER_RADIUS,
    borderBottomRightRadius: BORDER_RADIUS,
    borderTopLeftRadius: factorNum === 0 ? BORDER_RADIUS : 0,
    borderTopRightRadius: factorNum === 0 ? BORDER_RADIUS : 0,
  };
};

const factorBar = (isExercise, isTop) => {
  return {
    value: FACTOR_BAR_HEIGHT,
    color: isExercise ? tertiary : secondary,
    borderTopLeftRadius: isTop ? BORDER_RADIUS : 0,
    borderTopRightRadius: isTop ? BORDER_RADIUS : 0,
  };
};
