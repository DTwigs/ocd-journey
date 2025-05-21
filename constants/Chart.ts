import { INTERVALS } from "./Dates";
import { format, parseISO } from "date-fns";

type ChartPropsByIntervalType = {
  [key: number]: {
    format: (date: string) => string | null;
    labelWidth: number | null;
    barWidth: number;
    spacing: number;
  };
};

export const CHART_PROPS_BY_INTERVAL: ChartPropsByIntervalType = {
  [INTERVALS.WEEK]: {
    format: (date: string) => format(parseISO(date), "EEEEEE"),
    labelWidth: null,
    barWidth: 38,
    spacing: 2,
  },
  [INTERVALS.MONTH]: {
    format: (date: string) => {
      const dayNum = format(date, "d");
      if (dayNum === "1") {
        return format(date, "MMM");
      } else if (dayNum === "15") {
        return dayNum;
      }
      return null;
    },
    labelWidth: 28,
    barWidth: 8.6,
    spacing: 1,
  },
  [INTERVALS.QUARTER]: {
    format: (date: string) => {
      const dayNum = format(date, "d");
      if (dayNum === "1") {
        return format(date, "MMM");
      } else if (dayNum === "15") {
        return dayNum;
      }
      return null;
    },
    labelWidth: 28,
    barWidth: 3.2,
    spacing: 0,
  },
  [INTERVALS.ALL]: {
    format: (date: string) => format(date, "d"),
    labelWidth: 28,
    barWidth: 16,
    spacing: 12,
  },
};
