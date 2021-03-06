import { Fade } from "@material-ui/core";
import React, { useContext } from "react";
import { AppContext } from "../../../../../Context/App.context";
import { SPEAK_TEXT } from "../../../../../Reducers/actionTypes";
import "./Yesno.scss";

interface Props {}

const Yesno: React.FC<Props> = () => {
  const { dispatch } = useContext(AppContext);
  return (
    <Fade in={true}>
      <div className="yesno d-md-flex justify-content-between align-items-center">
        <div
          onClick={() => dispatch({ type: SPEAK_TEXT, payload: "Yes" })}
          className="yes grow flex-grow-1 shadow-lg m-5 d-flex justify-content-center align-items-center"
        >
          Yes
        </div>

        <div
          onClick={() => dispatch({ type: SPEAK_TEXT, payload: "No" })}
          className="no grow flex-grow-1 shadow-lg m-5 d-flex justify-content-center align-items-center"
        >
          No
        </div>
      </div>
    </Fade>
  );
};

export default Yesno;
