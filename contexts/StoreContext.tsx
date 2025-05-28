import { createContext, useReducer } from "react";
import { logEntryModel } from "@/models/logEntry";
import { stateModel } from "@/models/state";
import { settingsModel } from "@/models/settings";
import { characterModel } from "@/models/character";
import * as db from "@/db";
import { uiError } from "@/utils/logger";
import { mockLogEntries } from "@/mockData/mockLogEntries";
import type { State } from "@/models/state/type";

const { fillMissingLogs } = logEntryModel;

const initialState = {
  ...logEntryModel.initialState,
  ...characterModel.initialState,
  ...settingsModel.initialState,
};

export const StoreContext = createContext(initialState);

// combine reducers
const Reducers = {
  ...stateModel.reducers,
  ...logEntryModel.reducers,
  ...settingsModel.reducers,
  ...characterModel.reducers,
};

type Action = { type: keyof typeof Reducers; value?: any };

const reducer = (state: State, action: Action) => {
  const act = Reducers[action.type];

  if (!act) {
    uiError("Action Type: ", action.type);
    return { ...state };
  }

  const update = act(state, action.value);
  return { ...state, ...update };
};

export const StoreProvider = (props: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = async () => {
    // await db.removeLogEntriesData();
    // await db.removeSettingsData();
    // use mockData
    const logEntries = mockLogEntries;
    // const logEntries = await db.getLogEntries();
    const settings = await db.getSettings();
    const character = await db.getCharacter();

    dispatch({
      type: stateModel.SET_STATE,
      value: {
        logEntries: fillMissingLogs(logEntries),
        settings: settings ?? initialState.settings,
        character: character ?? initialState.character,
      },
    });
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, init }}>
      {props.children}
    </StoreContext.Provider>
  );
};
