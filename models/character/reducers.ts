import { ADD_TOTAL_RESIST, LEVEL_UP } from "./actions";
import type { State } from "../state/type";
import * as db from "@/db";
import type { Character } from "./type";

export const initialState: { character: Character } = {
  character: {
    totalResists: 0,
    level: 1,
  },
};

type LogEntryReducers = {
  [ADD_TOTAL_RESIST]: (state: State) => State;
  [LEVEL_UP]: (state: State, value: number) => State;
};

export const reducers: LogEntryReducers = {
  [ADD_TOTAL_RESIST]: (state: State) => {
    const updatedCharacter = {
      ...state.character,
      totalResists: state.character.totalResists + 1,
    };

    const newState = {
      ...state,
      character: updatedCharacter,
    };
    db.setCharacter(updatedCharacter);

    return newState;
  },
  [LEVEL_UP]: (state: State, value: number) => {
    const updatedCharacter = {
      ...state.character,
      level: value,
    };

    const newState = {
      ...state,
      character: updatedCharacter,
    };
    db.setCharacter(updatedCharacter);

    return newState;
  },
};
