import React from "react";

function ProgressBar({ className = "", percent }) {
  return (
    <div className={"ProgressBar " + className}>
      <div
        className="ProgressBar__width"
        style={{
          width: `${percent}%`
        }}
      ></div>{" "}
    </div>
  );
}

export default ProgressBar;
