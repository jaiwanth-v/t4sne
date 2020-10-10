import { SPEAK_TEXT, SET_VOICE, SPEAK_FROM_HISTORY } from "./actionTypes";
import Speech from "speak-tts";

interface Action {
  type: string;
  payload: any;
}

interface AppState {
  history: Array<string>;
  voice: any;
}

export const reducer = (state: AppState, { type, payload }: Action) => {
  if (type === SET_VOICE) return { ...state, voice: payload };
  if (type === SPEAK_TEXT || type === SPEAK_FROM_HISTORY) {
    const speech = new Speech();
    speech.setVoice(state.voice.name);
    speech.setLanguage(state.voice.lang);
    speech.speak({ text: payload });
    if (type === SPEAK_TEXT)
      return { ...state, history: [payload, ...state.history] };
  }
  return state;
};
