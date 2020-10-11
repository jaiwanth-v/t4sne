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
  const { state, dispatch } = useContext(AppContext);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (dark === true) dispatch({ type: TOGGLE_DARK });
    else dispatch({ type: TOGGLE_KEYBOARD });
    document
      .getElementsByClassName("toggle-container")[0]
      .classList.toggle("toggle-active");
  };
  return (
    <div className="toggle-container switch_box box_1">
      {dark ? (
        <input
          onChange={handleChange}
          checked={state.isDark}
          type="checkbox"
          className="switch_1"
        />
      ) : (
        <input
          onChange={handleChange}
          checked={state.keyboard}
          type="checkbox"
          className="switch_1"
        />
      )}
    </div>
  );
};

export default CustomToggle;
