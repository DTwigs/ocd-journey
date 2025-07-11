import { differenceInDays, parseISO, subDays } from "date-fns";
import type { ColorValue } from "react-native";
import { formatDateKey } from "./selectors";
import { INTERVALS } from "@/constants/Dates";
import { primary, tertiary, secondary } from "@/constants/Colors";
import { CHART_PROPS_BY_INTERVAL } from "@/constants/Chart";
import type {
  ChartDatum,
  LogEntries,
  LogEntryStatName,
  LogEntryFactors,
} from "./type";

type FactorMapType = {
  [key: number]: { name: keyof LogEntryFactors; color: ColorValue };
};

const BORDER_RADIUS = 1;
const FACTOR_MAP: FactorMapType = {
  1: { name: "factor1", color: tertiary },
  2: { name: "factor2", color: secondary },
};

type LineDatum = { value: number; dateKey: string };

type GetChartDataRangeReturnType = {
  chartData: ChartDatum[];
  lineData: LineDatum[];
};

export const getChartDataRange = (
  entries: LogEntries,
  statName: LogEntryStatName,
  interval: number = INTERVALS.WEEK,
  startDate: string = formatDateKey(new Date()),
  factorNumToShow: number = 0, // define which factor to show colors for on the chart
  isNotesView: boolean = false,
): GetChartDataRangeReturnType => {
  const startIndex = differenceInDays(
    parseISO(formatDateKey(new Date())),
    parseISO(startDate),
  );
  const endIndex = startIndex - interval + 1;

  const lineData = [];
  const chartData = [];
  for (let i = startIndex; i >= endIndex; i--) {
    const dateKey = formatDateKey(subDays(new Date(), i));
    const entry = entries.get(dateKey);
    const value = entry?.[statName] ?? 0;

    let frontColor;
    if (factorNumToShow > 0) {
      const { name, color } = FACTOR_MAP[factorNumToShow];
      frontColor = entry?.[name] ? color : undefined;
    }

    lineData.push({ value, dateKey });

    const highlightNote = isNotesView && i === startIndex;

    chartData.push({
      label: CHART_PROPS_BY_INTERVAL[interval].format(dateKey),
      value,
      frontColor: highlightNote ? primary : frontColor,
      factor2: entry?.factor2,
      factor1: entry?.factor1,
      barBorderTopLeftRadius: BORDER_RADIUS,
      barBorderTopRightRadius: BORDER_RADIUS,
      barBorderBottomLeftRadius: 0,
      barBorderBottomRightRadius: 0,
      labelWidth: CHART_PROPS_BY_INTERVAL[interval].labelWidth,
    });
  }

  return { chartData, lineData };
};

export async function asyncGetChartDataRange(
  ...props: any
): Promise<GetChartDataRangeReturnType> {
  return new Promise((resolve) => {
    // @ts-expect-error: "this"
    const result = getChartDataRange.apply(this, props);
    const movingAverageLine = calculateMovingAverage(result.lineData);
    setTimeout(() => resolve({ ...result, lineData: movingAverageLine }), 0);
  });
}

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
    const mean = (value + (previousValue ?? 0) + (nextValue ?? 0)) / divider;
    return {
      value: mean,
      dateKey,
    };
  });
};

// Changes only the frontColor of each item
// we don't want to recalculate the entire array when we change
// factor color.
export const updateChartDataWithFactorColor = (
  chartData: ChartDatum[],
  factorNumToShow: number,
  isNotesView: boolean,
): ChartDatum[] => {
  return chartData.map((datum: ChartDatum, i) => {
    let frontColor: ColorValue | undefined =
      isNotesView && i === 0 ? primary : undefined;

    if (factorNumToShow > 0) {
      const { color } = FACTOR_MAP[factorNumToShow];
      const value = [null, datum.factor1, datum.factor2][factorNumToShow];
      frontColor = value ? color : frontColor;
    }

    return {
      ...datum,
      frontColor,
    };
  });
};

type FindClosestValueReturnType = null | number;

// To avoid having nulls affect the average we are skipping over them and finding the closest real value
const findClosestValue = (
  arr: LineDatum[],
  index: number,
  direction: -1 | 1,
): FindClosestValueReturnType => {
  if (
    (direction === -1 && index <= 0) ||
    (direction === 1 && index >= arr.length - 1)
  ) {
    return null;
  }

  const value = arr[index + direction]?.value;
  return value ?? findClosestValue(arr, index + direction, direction);
};
