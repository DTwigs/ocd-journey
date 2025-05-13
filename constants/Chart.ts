import { INTERVALS } from "./Dates";
import { format, parseISO } from "date-fns";

export const CHART_PROPS_BY_INTERVAL = {
  [INTERVALS.WEEK]: {
    format: (date) => format(parseISO(date), "EEEEEE"),
    labelWidth: null,
    barWidth: 28,
    spacing: 12,
  },
  [INTERVALS.MONTH]: {
    format: (date, index) => (index % 7 === 0 ? format(date, "d") : null),
    labelWidth: 16,
    barWidth: 7,
    spacing: 3,
  },
  [INTERVALS.QUARTER]: {
    format: (date) => {
      const dayNum = format(date, "d");
      if (dayNum === "1") {
        return format(date, "MMM");
      } else if (dayNum === "15") {
        return dayNum;
      }
      return null;
    },
    labelWidth: 28,
    barWidth: 3,
    spacing: 0.5,
  },
  [INTERVALS.ALL]: {
    format: (date) => format(date, "d"),
    labelWidth: 28,
    barWidth: 16,
    spacing: 12,
  },
};
