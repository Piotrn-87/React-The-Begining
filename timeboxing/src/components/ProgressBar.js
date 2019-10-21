import React from "react";
import classNames from "classnames";

function ProgressBar({ className = "", percent, big = false, color = null }) {
  let progressClassName = classNames("ProgressBar", className, {
    "progress--big": big,
    "progress--color-red": color === "red"
  });
  return (
    <div className={progressClassName}>
      <div
        className="ProgressBar__width"
        style={{
          width: `${percent}%`
        }}
      ></div>
    </div>
  );
}

export default ProgressBar;
