import {
  LogEntries,
  LogEntryNotes,
  LogEntryStats,
} from "@/models/logEntry/type";
import { getMonth, parseISO, subMonths } from "date-fns";
import { formatDateKey } from "@/models/logEntry/selectors";

type NotesListItem = {
  date: string;
  type: "divider" | "stats";
} & LogEntryNotes;

export const createListOfNotes = (
  logEntries: LogEntries,
): Array<NotesListItem> => {
  let notesList: Array<NotesListItem> = [];
  let lastDate: string | null = null;
  Array.from(logEntries)
    .reverse()
    .forEach(([date, logEntry]: [string, LogEntryStats]) => {
      if (!logEntry.notes) {
        return;
      }

      const monthDividers = buildMonthDividers(date, lastDate);
      notesList = [...notesList, ...monthDividers];

      notesList.push({
        date,
        type: "stats",
        notes: logEntry.notes,
      });
      lastDate = date;
    });
  return notesList;
};

const buildMonthDividers = (date: string, lastDate: string | null) => {
  const monthDiff = lastDate
    ? getMonth(parseISO(lastDate)) - getMonth(parseISO(date))
    : 0;
  const monthDividers: Array<NotesListItem> = [];
  let counter = 0;
  if (monthDiff > 0) {
    while (counter < monthDiff) {
      monthDividers.push({
        date: formatDateKey(subMonths(date, counter)),
        type: "divider",
      });
      counter++;
    }
  }
  return monthDividers;
};
