import { Button, Icon, MenuItem, Select } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import "./NewUserPage.scss";
import Speech from "speak-tts";
import _prepareSpeakButton from "../../Speech";
import useToggle from "../../Hooks/useToggle";
import CustomToggle from "./CustomToggle/CustomToggle";
import { AppContext } from "../../Context/App.context";
import { SET_VOICE } from "../../Reducers/actionTypes";

interface Props {
  history: any;
}

const NewUserPage: React.FC<Props> = ({ history }) => {
  const speech = new Speech();

  const [voice, setVoice] = useState<any>("");
  const [data, setData] = useState<any>({});
  const [hidden, toggleHidden] = useToggle(true);
  const { dispatch } = useContext(AppContext);

  const _init = async () => {
    const speechData = await speech.init();
    setData(speechData);
    _prepareSpeakButton(speech);
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
    console.log(voice);
    console.log(speech);
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
      listeners: {
        onstart: () => {
          console.log("Start utterance");
        },
        onend: () => {
          console.log("End utterance");
        },
        onresume: () => {
          console.log("Resume utterance");
        },
        onboundary: (event: any) => {
          console.log(
            event.name +
              " boundary reached after " +
              event.elapsedTime +
              " milliseconds."
          );
        },
      },
    });
  };

  const handleRoute = () => {
    console.log(voice || data.voices[11]);
    dispatch({ type: SET_VOICE, payload: voice || data.voices[11] });
    setTimeout(() => {
      history.push("/dashboard");
    }, 300);
  };

  return (
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

export default withRouter(NewUserPage);
