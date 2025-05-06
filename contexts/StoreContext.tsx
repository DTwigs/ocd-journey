import { createContext, useReducer } from "react";
import {
  reducer as logEntryReducer,
  initialState as logEntryInitialState,
} from "@/models/logEntry/reducers";

const initialState = {
  ...logEntryInitialState,
};

export const StoreContext = createContext(initialState);

// combine reducers
const Actions = {
  ...logEntryReducer,
};

const reducer = (state, action) => {
  const act = Actions[action.type];
  const update = act(state);
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
