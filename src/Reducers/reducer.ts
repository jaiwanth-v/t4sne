import { ADD_TEXT, SET_VOICE } from "./actionTypes";

interface Action {
  type: string;
  payload: any;
}

interface AppState {
  history: Array<string>;
  voice: any;
}

export const reducer = (state: AppState, action: Action) => {
  if (action.type === SET_VOICE) return { ...state, voice: action.payload };
  if (action.type === ADD_TEXT)
    return { ...state, history: [...state.history, action.payload] };
  return state;
};
