import { SET_FACTORS, SET_DARKMODE, SET_ONBOARDING } from "./actions";
import type { State } from "../state/type";
import * as db from "@/db";
import type { Factors } from "./type";

export const initialState = {
  settings: {
    factors: {
      factor1: { name: "Exercise" },
      factor2: { name: "Travel" },
    },
    darkMode: null,
    isOnboarding: true,
  },
};

type SettingsReducers = {
  [SET_FACTORS]: (state: State, value: Factors) => State;
  [SET_DARKMODE]: (state: State, value: boolean) => State;
  [SET_ONBOARDING]: (state: State, value: boolean) => State;
};

export const reducers: SettingsReducers = {
  [SET_FACTORS]: (state: State, value: Factors) => {
    const updatedSettings = {
      ...state.settings,
      factors: value,
    };

    const newState = {
      ...state,
      settings: updatedSettings,
    };

    db.setSettings(updatedSettings);
    return newState;
  },
  [SET_DARKMODE]: (state: State, value: boolean) => {
    const updatedSettings = {
      ...state.settings,
      darkMode: value,
    };

    const newState = {
      ...state,
      settings: updatedSettings,
    };

    db.setSettings(updatedSettings);
    return newState;
  },
  [SET_ONBOARDING]: (state: State, value: boolean) => {
    const updatedSettings = {
      ...state.settings,
      isOnboarding: value,
    };

    const newState = {
      ...state,
      settings: updatedSettings,
    };

    db.setSettings(updatedSettings);
    return newState;
  },
};
