import React from "react";
import "./CustomButton.scss";

interface Props {}

const CustomButton: React.FC<Props> = () => {
  return (
    <div className="text-center">
      <ul className="cloud__zNyUD">
        <label htmlFor="none-of-these" className="checkboxBtn">
          <input
            type="checkbox"
            id="none-of-these"
            name="none-of-these"
            className="input"
            aria-checked="false"
            value="none-of-these"
          />
          <span className="inner">
            <span className="icon">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                aria-hidden="true"
                className="icon__2tEME"
              >
                <path
                  className="forrest__2Unbb"
                  d="M4.615 13.269c-0.002 0-0.004 0-0.007 0-0.317 0-0.604-0.128-0.813-0.335l-3.461-3.461c-0.21-0.21-0.339-0.499-0.339-0.819 0-0.64 0.519-1.159 1.159-1.159 0.32 0 0.61 0.13 0.819 0.339v0l2.642 2.654 8.412-8.423c0.21-0.21 0.499-0.339 0.819-0.339 0.64 0 1.159 0.519 1.159 1.159 0 0.32-0.13 0.61-0.339 0.819l-9.231 9.231c-0.208 0.207-0.496 0.335-0.813 0.335-0.002 0-0.005 0-0.007-0h0z"
                ></path>
              </svg>
            </span>
            <span className="text">Done</span>
          </span>
        </label>
      </ul>
    </div>
  );
};

export default CustomButton;
