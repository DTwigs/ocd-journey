import { Character } from "../character/type";
import type { LogEntries } from "../logEntry/type";
import type { Settings } from "../settings/type";

export type State = {
  logEntries: LogEntries;
  settings: Settings;
  character: Character;
};
