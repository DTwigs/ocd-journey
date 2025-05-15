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

const BORDER_RADIUS = 1;
const FACTOR_MAP = {
  1: { name: "period", color: secondary },
  2: { name: "exercise", color: tertiary },
};

type LineDatum = { value: number; dateKey: string };

type GetChartDataRangeReturnType = {
  chartData: ChartDatum<LogEntryType>[];
  max: number;
  lineData: LineDatum[];
};

export const getChartDataRange = (
  entries: LogEntries,
  statName: LogEntryCoreStatName,
  numberOfRecords: number = INTERVALS.WEEK,
  startIndex: number = 0,
  factorNumToShow: number = 0, // define which factor to show colors for on the chart
): GetChartDataRangeReturnType => {
  let endIndex = entries.size;
  if (numberOfRecords > 0) {
    endIndex = startIndex + numberOfRecords - 1;
  }

  const arrOfKeys = [];
  for (let i = endIndex; i >= startIndex; i--) {
    arrOfKeys.push(formatDateKey(subDays(new Date(), i)));
  }

  const minMaxArray = [];
  const lineData = [];
  const chartData = arrOfKeys.map((dateKey: string, index: number) => {
    const entry = entries.get(dateKey);
    const value = entry?.[statName] ?? 0;
    minMaxArray.push(value);

    let frontColor;
    if (factorNumToShow > 0) {
      const { name, color } = FACTOR_MAP[factorNumToShow];
      frontColor = entry?.[name] ? color : null;
    }

    lineData.push({ value, dateKey });

    return {
      label: CHART_PROPS_BY_INTERVAL[numberOfRecords].format(dateKey, index),
      value,
      frontColor,
      barBorderTopLeftRadius: BORDER_RADIUS,
      barBorderTopRightRadius: BORDER_RADIUS,
      barBorderBottomLeftRadius: 0,
      barBorderBottomRightRadius: 0,
      labelWidth: CHART_PROPS_BY_INTERVAL[numberOfRecords].labelWidth,
    };
  });

  return { chartData, max: Math.max(...minMaxArray), lineData };
};

// Three day moving average
export const calculateMovingAverage = (arr: LineDatum[]): LineDatum[] => {
  return arr.map(({ value, dateKey }, index) => {
    // Maintain null values so line chart lines up correctly with bar chart.
    if (value == null) {
      return { value, dateKey };
    }
    const previousValue = findClosestValue(arr, index, -1);
    const nextValue = findClosestValue(arr, index, 1);
    let divider = 1;
    divider += Number(previousValue != null) + Number(nextValue != null);
    const mean = (value + previousValue + nextValue) / divider;
    return {
      value: mean,
      dateKey,
    };
  });
};

// To avoid having nulls affect the average we are skipping over them and finding the closest real value
const findClosestValue = (
  arr: LineDatum[],
  index: number,
  direction: -1 | 1,
) => {
  if (
    (direction === -1 && index <= 0) ||
    (direction === 1 && index >= arr.length - 1)
  ) {
    return null;
  }

  const value = arr[index + direction]?.value;
  return value ?? findClosestValue(arr, index + direction, direction);
};
