import { logEntryModel } from "@/models/logEntry";
import { subDays } from "date-fns";

const { formatDateKey, makeStats } = logEntryModel;

const mockData = new Map();

const PERIOD_LENGTH = 7;

let fac2Counter = 0;

for (let i = 100; i > 0; i--) {
  if (fac2Counter > 28) {
    fac2Counter = 0;
  }
  fac2Counter++;
  let goodMultiplier = 10;
  let badMultiplier = 10;
  if (i > 20) {
    goodMultiplier = 5;
  } else if (i > 10) {
    goodMultiplier = 8;
    badMultiplier = 5;
  } else if (i <= 10) {
    badMultiplier = 3;
  }
  const hasTravel = fac2Counter < PERIOD_LENGTH;
  mockData.set(
    formatDateKey(subDays(new Date(), i)),
    makeStats({
      resists: Math.floor(Math.random() * 6),
      mood: Math.floor(Math.random() * goodMultiplier),
      energy: Math.floor(Math.random() * goodMultiplier),
      anxiety: Math.floor(
        Math.random() *
          (hasTravel ? Math.min(badMultiplier + 5, 10) : badMultiplier),
      ),
      factor1: Math.random() < 0.5,
      factor2: hasTravel,
      notes: Math.random() > 0.7 ? generateRandomSentence() : undefined,
    }),
  );
}

function generateRandomSentence() {
  let subjects = [
    "The cat",
    "A dear friend",
    "The mage",
    "Our team",
    "A crab the size of a car",
  ];
  let verbs = ["completed", "created", "drew", "heard", "summoned"];
  let objects = [
    "the task",
    "a bug",
    "the module",
    "a unicorn",
    "the fourth tree from the left",
  ];

  let subject = subjects[Math.floor(Math.random() * subjects.length)];
  let verb = verbs[Math.floor(Math.random() * verbs.length)];
  let object = objects[Math.floor(Math.random() * objects.length)];

  return `${subject} ${verb} ${object}.`;
}

export const mockLogEntries = mockData;
