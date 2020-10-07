import { Button, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Speech from "speak-tts";
import _prepareSpeakButton from "../../Speech";

const _addVoicesList = (voices: any) => {
  const list = window.document.createElement("div");
  let html =
    '<h2>Available Voices</h2><select id="languages"><option value="">autodetect language</option>';
  voices.forEach((voice: any) => {
    html += `<option value="${voice.lang}" data-name="${voice.name}">${voice.name} (${voice.lang})</option>`;
  });
  list.innerHTML = html;
  window.document.body.appendChild(list);
};

function _init() {
  const speech = new Speech();
  speech
    .init()
    .then((data: any) => {
      console.log("Speech is ready", data);
      _addVoicesList(data.voices);
      _prepareSpeakButton(speech);
    })
    .catch((e: any) => {
      console.error("An error occured while initializing : ", e);
    });
}

interface Props {}

const Main: React.FC<Props> = () => {
  const [inp, setInput] = useState(" Hello, how are you today ?");

  useEffect(() => {
    _init();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  return (
    <div>
      <input id="text" type="text" value={inp} onChange={handleChange} />
      <Button id="play"> Play </Button>
      <Button id="pause"> Pause </Button>
      <Button id="resume"> Resume </Button>
    </div>
  );
};

export default Main;
