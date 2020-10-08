import { SPEAK_TEXT, SET_VOICE } from "./actionTypes";
import Speech from "speak-tts";

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
  if (action.type === SPEAK_TEXT) {
    const speech = new Speech();
    speech.setVoice(state.voice.name);
    speech.setLanguage(state.voice.lang);
    speech.speak({ text: action.payload });
    return { ...state, history: [...state.history, action.payload] };
  }
  return state;
};
