import { SET_FACTORS } from "./actions";
import type { State } from "../state/type";
import * as db from "@/db";
import type { Factors } from "./type";

export const initialState = {
  settings: {
    factors: {
      factor1: { name: "Exercise" },
      factor2: { name: "Monthly Cycle" },
    },
  },
};

type SettingsReducers = {
  [SET_FACTORS]: (state: State, value: Factors) => State;
};

export const reducers: SettingsReducers = {
  [SET_FACTORS]: (state: State, value: Factors) => {
    const updatedSettings = {
      factors: value,
    };

    const newState = {
      ...state,
      settings: updatedSettings,
    };

    db.setSettings(updatedSettings);
    return newState;
  },
};
