import { Button } from "@material-ui/core";
import React, { useState } from "react";
import _init from "./Speech";

interface Props {}

const App: React.FC<Props> = () => {
  const [inp, setInput] = useState(" Hello, how are you today ?");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  return (
    <div>
      <textarea
        onChange={handleChange}
        id="text"
        style={{ width: "500px", height: "300px" }}
      >
        {inp}
      </textarea>
      <Button id="play"> Play </Button>
      <Button id="pause"> Pause </Button>
      <Button id="resume"> Resume </Button>
      <Button onClick={_init}>Hi</Button>
    </div>
  );
};

export default App;
