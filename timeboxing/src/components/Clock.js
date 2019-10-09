import React from "react";

function Clock({ className = "", minutes, seconds }) {
  return (
    <h2 className={"clock " + className}>
      {" "}
      Time to left: {minutes < 10 ? "0" + minutes : minutes}:{" "}
      {seconds < 10 ? "0" + seconds : seconds}{" "}
    </h2>
  );
}

export default Clock;
