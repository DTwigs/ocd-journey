import { INTERVALS } from "./Dates";
import { format } from "date-fns";

export const CHART_PROPS_BY_INTERVAL = {
  [INTERVALS.WEEK]: {
    format: (date) => format(date, "EEEEEE"),
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
    format: (date) => format(date, "d"),
    labelWidth: 28,
    barWidth: 2,
    spacing: 1,
  },
  [INTERVALS.ALL]: {
    format: (date) => format(date, "d"),
    labelWidth: 28,
    barWidth: 16,
    spacing: 12,
  },
};
