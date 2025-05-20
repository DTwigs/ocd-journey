import { SET_STATE } from "./actions";
import type { State } from "../state/type";

type StateReducers = {
  [SET_STATE]: (state: State, value: State) => State;
};

export const reducers: StateReducers = {
  [SET_STATE]: (state: State, value: State) => {
    return { ...state, ...value };
  },
};
