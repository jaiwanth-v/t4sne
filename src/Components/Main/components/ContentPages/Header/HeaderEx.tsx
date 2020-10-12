import React, { memo, useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../../../../Context/App.context";
import { SPEAK_FROM_HISTORY } from "../../../../../Reducers/actionTypes";
import "./Header.scss";

const HeaderEx = () => {
  const {
    state: { history },
    dispatch,
  } = useContext(AppContext);
  return (
    <div className="header d-flex justify-content-between align-items-center vw-100 m-5 ">
      <Link to="/">
        <h5 className="dashboard-header">Dashboard</h5>
      </Link>
      <div
        className={`d-flex  ${
          !history.length && "justify-content-center"
        } align-items-center header-history`}
      >
        {!history.length
          ? "Your history will appear here..."
          : history.map((item: string, idx: number) => (
              <div
                key={idx}
                onClick={() =>
                  dispatch({ type: SPEAK_FROM_HISTORY, payload: item })
                }
                className="history-item m-1"
              >
                {item}
              </div>
            ))}
      </div>
    </div>
  );
};

export default memo(HeaderEx);
