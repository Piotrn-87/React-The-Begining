import React from "react";

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
  return (
    <div className="Timebox">
      <h3>
        {title} - {totalTimeInMinutes}
        min.
      </h3>
      <button onClick={onDelete}> Delete </button>
      <button onClick={onEdit}> Edit </button> <input />
    </div>
  );
}
export default Timebox;
