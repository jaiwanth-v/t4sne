import { Button, Fade, TextField } from "@material-ui/core";
import React, { useContext, useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { AppContext } from "../../../../../Context/App.context";
import useInput from "../../../../../Hooks/useInput";
import { SPEAK_TEXT } from "../../../../../Reducers/actionTypes";
import "./MainContent.scss";

interface Props {}

const MainContent: React.FC<Props> = () => {
  const {
    state: { keyboard },
    dispatch,
  } = useContext(AppContext);

  const [layout, setLayout] = useState("default");
  const [input, setInput] = useInput("");
  const keyboardRef: any = useRef();

  const handleChangeKeyboard = (input: string) => {
    setInput(input);
  };

  const handleShift = () => {
    const newLayoutName = layout === "default" ? "shift" : "default";
    setLayout(newLayoutName);
  };

  const onKeyPress = (button: any) => {
    if (button === "{shift}" || button === "{lock}") handleShift();
  };

  const handleChange = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: any;
    }>
  ) => {
    setInput(event.target.value);
    keyboardRef.current?.setInput(input);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: SPEAK_TEXT, payload: input });
    setInput("");
    keyboardRef.current?.setInput("");
  };

  return (
    <Fade in={true}>
      <div className="main-wrapper mr-5">
        <div className="main-content  d-flex justify-content-center flex-column align-items-center">
          <h2 className="text-center main-header">
            Type what you want to talk
          </h2>
          <form
            className="d-flex flex-column justify-content-center align-items-center"
            onSubmit={handleSubmit}
          >
            <TextField
              required
              variant="outlined"
              className="m-5 main-text-field"
              value={input}
              onChange={handleChange}
            />
            <Button type="submit">Speak</Button>
          </form>
          <Fade in={keyboard}>
            <div className="keyboard mt-4">
              <Keyboard
                keyboardRef={(r) => (keyboardRef.current = r)}
                layoutName={layout}
                onChange={handleChangeKeyboard}
                onKeyPress={onKeyPress}
              />
            </div>
          </Fade>
        </div>
      </div>
    </Fade>
  );
};

export default MainContent;
