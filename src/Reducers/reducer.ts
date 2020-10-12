import {
  SPEAK_TEXT,
  SET_VOICE,
  SPEAK_FROM_HISTORY,
  TOGGLE_KEYBOARD,
  TOGGLE_DARK,
  INIT_STATE,
} from "./actionTypes";
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  setFetchMethod,
} from "darkreader";
import Speech from "speak-tts";

interface Action {
  type: string;
  payload: any;
}

interface AppState {
  history: Array<string>;
  voice: any;
  keyboard: boolean;
  isDark: boolean;
}

const toggleDark = (state: AppState) => {
  setFetchMethod(window.fetch);
  if (!state.isDark)
    enableDarkMode({
      brightness: 100,
      contrast: 100,
      sepia: 10,
    });
  else disableDarkMode();
};

export const reducer = (state: AppState, { type, payload }: Action) => {
  if (type === INIT_STATE) {
    return {
      history: [],
      keyboard: false,
      isDark: false,
      voice: payload,
    };
  }
  if (type === SET_VOICE) return { ...state, voice: payload };
  if (type === SPEAK_TEXT || type === SPEAK_FROM_HISTORY) {
    const speech = new Speech();
    speech.setVoice(state.voice.name);
    speech.setLanguage(state.voice.lang);
    speech.speak({ text: payload });
    if (type === SPEAK_TEXT)
      return { ...state, history: [payload, ...state.history] };
  }
  if (type === TOGGLE_KEYBOARD) return { ...state, keyboard: !state.keyboard };
  if (type === TOGGLE_DARK) {
    toggleDark(state);
    return { ...state, isDark: !state.isDark };
  }

  return state;
};
