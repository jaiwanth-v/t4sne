import { Button, Icon, MenuItem, Select } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "./NewUserPage.scss";
import Speech from "speak-tts";
import useToggle from "../../Hooks/useToggle";
import CustomToggle from "./CustomButton/CustomButton";
import { AppContext } from "../../Context/App.context";
import { SET_VOICE } from "../../Reducers/actionTypes";
import Main from "../Main/Main";

interface Props {}

const NewUserPage: React.FC<Props> = () => {
  const speech = new Speech();
  const [isNew, toggleNew] = useToggle(true);
  const [voice, setVoice] = useState<any>("");
  const [data, setData] = useState<any>({});
  const [hidden, toggleHidden] = useToggle(true);
  const { dispatch } = useContext(AppContext);

  const _init = async () => {
    const speechData = await speech.init();
    setData(speechData);
  };

  useEffect(() => {
    _init();
    setTimeout(() => {
      toggleHidden(hidden);
    }, 3200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      speech.setLanguage(data.voices[11].lang);
      speech.setVoice(data.voices[11].name);
    }
    speech.speak({
      text: "Hello, how are you today ?",
      queue: false,
    });
  };

  const handleRoute = () => {
    dispatch({ type: SET_VOICE, payload: voice || data.voices[11] });
    setTimeout(() => {
      toggleNew(isNew);
    }, 300);
  };

  return !isNew ? (
    <Main />
  ) : (
    <div>
      <div className="welcome">
        <span id="splash-overlay" className="splash" />
        <span id="welcome" className="z-depth-4" />

        <main className="valign-wrapper mt-5">
          <span className="container grey-text text-lighten-1 ">
            <h1 className="title grey-text center-align text-lighten-3">
              Hi there !
            </h1>
            <p className="flow-text center-align">
              Looks like its your first time here, please select the voice you
              want to use
            </p>
            <div className="language-menu text-center mt-5">
              {data.voices && (
                <Select
                  style={{
                    color: "whitesmoke",
                    width: "300px",
                    height: "60px",
                    borderColor: "whitesmoke",
                  }}
                  className="mx-md-3 mb-3 mb-md-0"
                  variant="outlined"
                  value={voice || data.voices[11]}
                  onChange={handleVoice}
                >
                  {data.voices.map((voice: any, id: number) => (
                    <MenuItem value={voice} key={id}>
                      {voice.name.replace("Microsoft ", "")}
                    </MenuItem>
                  ))}
                </Select>
              )}
              <Button className="language-btn" onClick={handlePlay}>
                <Icon style={{ color: "whitesmoke" }}>volume_up</Icon>
              </Button>

              <div onClick={handleRoute} className="text-center">
                <CustomToggle />
              </div>
            </div>
          </span>
        </main>
      </div>
    </div>
  );
};

export default NewUserPage;
