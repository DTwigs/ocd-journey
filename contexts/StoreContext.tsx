import { createContext, useReducer } from "react";
import {
  actions as logEntryActions,
  initialState as logEntryInitialState,
} from "@/models/logEntry/reducers";
import type State from "@/models/state/type";

const initialState = {
  ...logEntryInitialState,
};

export const StoreContext = createContext(initialState);

// combine reducers
const Actions = {
  ...logEntryActions,
};

type Action = { type: string } | { type: string; value: string };

const reducer = (state: State, action: Action) => {
  const act = Actions[action.type];
  const update = act(state, action.value);
  return { ...state, ...update };
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StoreContext.Provider value={[state, dispatch]}>
      {props.children}
    </StoreContext.Provider>
  );
};
