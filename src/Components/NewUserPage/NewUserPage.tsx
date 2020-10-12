import { Button, Icon, MenuItem, Select } from "@material-ui/core";
import React, { useContext, useState } from "react";
import "./NewUserPage.scss";
import Speech from "speak-tts";
import useToggle from "../../Hooks/useToggle";
import CustomButton from "./CustomButton/CustomButton";
import { AppContext } from "../../Context/App.context";
import { SET_VOICE } from "../../Reducers/actionTypes";
import Main from "../Main/Main";
import { useComponentWillMount } from "../../Hooks/useComponentWillMount";

interface Props {}

const NewUserPage: React.FC<Props> = () => {
  const speech = new Speech();
  const [New, toggleNew] = useToggle(true);
  const [voice, setVoice] = useState<any>("");
  const [data, setData] = useState<any>({});
  const [hidden, toggleHidden] = useToggle(true);
  const [isSupported, setSupported] = useToggle(true);
  const { dispatch } = useContext(AppContext);

  useComponentWillMount(async () => {
    try {
      const speechData = await speech.init();
      setData(speechData);
    } catch (err) {
      if (window.localStorage.supported === "0") {
        setSupported(false);
      } else {
        window.localStorage.setItem("supported", "0");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        window.location.reload();
      }
    }
    setTimeout(() => {
      toggleHidden(hidden);
    }, 3200);
  });

  const handleVoice = (
    event: React.ChangeEvent<{
      name?: string | undefined;
      value: any;
    }>
  ) => {
    setVoice(event.target.value);
  };

  const handlePlay = () => {
    if (voice) {
      speech.setLanguage(voice.lang);
      speech.setVoice(voice.name);
    } else {
      speech.setLanguage(
        data.voices.length > 11 ? data.voices[11].lang : data.voices[0].lang
      );
      speech.setVoice(
        data.voices.length > 11 ? data.voices[11].name : data.voices[0].name
      );
    }
    speech.speak({
      text: "Hello, how are you today ?",
      queue: false,
    });
  };

  const handleRoute = () => {
    let voiceToSet = voice;
    if (!voiceToSet)
      voiceToSet = data.voices.length > 11 ? data.voices[11] : data.voices[0];
    dispatch({
      type: SET_VOICE,
      payload: voiceToSet,
    });
    setTimeout(() => {
      toggleNew(New);
    }, 300);
  };

  return !New ? (
    <Main isNew={true} />
  ) : (
    <div id="slide">
      <div className="welcome">
        <main className="valign-wrapper mt-5">
          <div className="container grey-text text-lighten-1 ">
            <h1 className="title grey-text center-align text-lighten-3">
              Hi there !
            </h1>
            {!isSupported ? (
              <p className="flow-text center-align">
                It seems that your browser doesn't support this application. You
                can try refreshing the page. If that doesn't work, please visit{" "}
                <a
                  target="__blank"
                  href="https://caniuse.com/?search=web%20audio"
                >
                  this website
                </a>{" "}
                to check which browsers are supported.
              </p>
            ) : (
              <div>
                <p className="flow-text center-align">
                  Looks like its your first time here, please select the voice
                  you want to use
                </p>
                <div className="language-menu text-center mt-5">
                  <div className="select-button justify-content-center">
                    {data.voices && (
                      <Select
                        style={{
                          color: "whitesmoke",
                          width: "300px",
                          height: "60px",
                          borderColor: "whitesmoke",
                        }}
                        className="select"
                        variant="outlined"
                        value={voice || data.voices[11] || data.voices[0]}
                        onChange={handleVoice}
                      >
                        {data.voices.map((voice: any, id: number) => (
                          <MenuItem value={voice} key={id}>
                            {voice.name.replace("Microsoft ", "")}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                    <Button className="speak-btn" onClick={handlePlay}>
                      <Icon style={{ color: "whitesmoke" }}>volume_up</Icon>
                    </Button>
                  </div>

                  <div className="d-flex justify-content-center">
                    <div
                      onClick={handleRoute}
                      className="text-center mt-3 done-button"
                    >
                      <CustomButton />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default NewUserPage;
