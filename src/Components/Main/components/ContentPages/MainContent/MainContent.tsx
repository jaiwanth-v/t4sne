import { TextField, Typography } from "@material-ui/core";
import React, { useRef, useState } from "react";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import useInput from "../../../../../Hooks/useInput";
import "./MainContent.scss";

interface Props {}

const MainContent: React.FC<Props> = () => {
  const [layout, setLayout] = useState("default");
  const [input, setInput] = useInput("");
  const keyboard: any = useRef();

  const handleChangeKeyboard = (input: string) => {
    setInput(input);
    console.log("Input changed", input);
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
    keyboard.current?.setInput(input);
  };

  return (
    <div className="main-wrapper d-flex justify-content-center align-items-center mr-5">
      <div className="main-content d-flex flex-column justify-content-center align-items-center">
        <h2 style={{ color: "whitesmoke" }} className="text-center">
          Hello Kids
        </h2>
        <TextField className="m-5" value={input} onChange={handleChange} />
        {/* <Keyboard
          keyboardRef={(r) => (keyboard.current = r)}
          layoutName={layout}
          onChange={handleChangeKeyboard}
          onKeyPress={onKeyPress}
        /> */}
      </div>
    </div>
  );
};

export default MainContent;
