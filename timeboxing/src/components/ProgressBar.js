import React from "react";

function ProgressBar({ className = "", percent }) {
  return (
    <div className={"progressBar " + className}>
      <div
        className="progressBar__width"
        style={{
          width: `${percent}%`
        }}
      ></div>{" "}
    </div>
  );
}

export default ProgressBar;
