import React, { useContext } from "react";
import { AppContext } from "../../../../../Context/App.context";
import {
  TOGGLE_DARK,
  TOGGLE_KEYBOARD,
} from "../../../../../Reducers/actionTypes";
import "./CustomToggle.scss";

interface Props {
  dark?: boolean;
}

const CustomToggle: React.FC<Props> = ({ dark }) => {
  const { dispatch } = useContext(AppContext);
  const handleClick = () => {
    if (dark === true) dispatch({ type: TOGGLE_DARK });
    else dispatch({ type: TOGGLE_KEYBOARD });
    document
      .getElementsByClassName("toggle-container")[0]
      .classList.toggle("toggle-active");
  };
  return (
    <div className="toggle-container switch_box box_1">
      <input onClick={handleClick} type="checkbox" className="switch_1" />
    </div>
  );
};

export default CustomToggle;
