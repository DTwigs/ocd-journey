import { createContext, useReducer } from "react";
import { logEntryModel } from "@/models/logEntry";
import { stateModel } from "@/models/state";
import * as db from "@/db";
import { uiError } from "@/utils/logger";
import type State from "@/models/state/type";

const initialState = {
  ...logEntryModel.initialState,
};

export const StoreContext = createContext(initialState);

// combine reducers
const Reducers = {
  ...stateModel.reducers,
  ...logEntryModel.reducers,
};

type Action = { type: string } | { type: string; value: State };

const reducer = (state: State, action: Action) => {
  const act = Reducers[action.type];

  if (!act) {
    uiError("Action Type: ", action.type);
    return { ...state };
  }

  const update = act(state, action.value);
  return { ...state, ...update };
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const init = async () => {
    const logEntries = await db.getLogEntries();
    dispatch({
      type: stateModel.SET_STATE,
      value: { logEntries: logEntries ?? [] },
    });
  };

  return (
    <StoreContext.Provider value={{ state, dispatch, init }}>
      {props.children}
    </StoreContext.Provider>
  );
};
