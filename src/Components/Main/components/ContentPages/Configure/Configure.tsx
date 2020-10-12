import React, { memo, useContext, useEffect, useState } from "react";
import { Button, Fade, Icon, MenuItem, Select } from "@material-ui/core";
import Speech from "speak-tts";
import { AppContext } from "../../../../../Context/App.context";
import { SET_VOICE } from "../../../../../Reducers/actionTypes";
import CustomButton from "../../../../NewUserPage/CustomButton/CustomButton";
import { withRouter } from "react-router-dom";
import "./Configure.scss";

interface Props {
  history: any;
}

const Configure: React.FC<Props> = ({ history }) => {
  const speech = new Speech();
  const { dispatch } = useContext(AppContext);
  const [voice, setVoice] = useState<any>("");
  const [data, setData] = useState<any>({});

  const _init = async () => {
    const speechData = await speech.init();
    setData(speechData);
    const voice = JSON.parse(window.localStorage.voice);
    let index = speechData.voices.findIndex(
      (x: any) => x.name.toString() === voice.name
    );

    if (index < 0) index = 0;

    setVoice(speechData.voices[index]);
  };

  useEffect(() => {
    _init();
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
    }
    speech.speak({
      text: "Hello, how are you today ?",
      queue: false,
    });
  };

  const handleRoute = () => {
    dispatch({
      type: SET_VOICE,
      payload: voice,
    });
    setTimeout(() => {
      history.push("/interactions");
    }, 300);
  };

  return (
    <Fade in={true}>
      <div className="configure mt-5">
        <h2 className="text-center mr-4">Configure Voice</h2>
        <div className="language-menu-configure text-center mt-5 ml-2">
          <div className="select-button justify-content-center">
            {data.voices && voice !== null && (
              <Select
                style={{
                  width: "300px",
                  height: "60px",
                }}
                className="mx-md-3 mb-3 mb-md-0"
                variant="outlined"
                value={voice || data.voices[11] || data.voices[0]}
                onChange={handleVoice}
              >
                {data.voices.map((voice: any, id: number) => (
                  <MenuItem
                    className="configure-menu-item"
                    value={voice}
                    key={id}
                  >
                    {voice.name.replace("Microsoft ", "")}
                  </MenuItem>
                ))}
              </Select>
            )}
            <Button onClick={handlePlay}>
              <Icon style={{ color: "whitesmoke" }}>volume_up</Icon>
            </Button>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div
              onClick={handleRoute}
              className="button-submit text-center mt-4 mr-5"
            >
              <CustomButton />
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default memo(withRouter(Configure));
