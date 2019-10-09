import React from "react";

function TimeboxEditor(props) {
  const {
    isEditable,
    onConfirm,
    onTitleChange,
    onTotalTimeInMinutesChange,
    title,
    totalTimeInMinutes
  } = props;
  return (
    <div className={`TimeboxEditor ${isEditable ? "" : "inactive"}`}>
      <label>
        {" "}
        Co Robisz ?
        <input
          disabled={!isEditable}
          value={title}
          onChange={onTitleChange}
          type="text"
        />
      </label>{" "}
      <br />
      <label>
        {" "}
        Jak Dlugo ?
        <input
          disabled={!isEditable}
          value={totalTimeInMinutes}
          onChange={onTotalTimeInMinutesChange}
          type="number"
        />
      </label>{" "}
      <br />
      <div className="TimeboxEditor__div">
        <button
          className="TimeboxEditor__button"
          onClick={onConfirm}
          disabled={!isEditable}
        >
          Confirm{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
}

export default TimeboxEditor;
