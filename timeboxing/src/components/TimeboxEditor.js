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
      <label className="TimeboxEditor__label">
        {" "}
        Co Robisz ?
        <input
          className="TimeboxEditor__input"
          disabled={!isEditable}
          value={title}
          onChange={onTitleChange}
          type="text"
        />
      </label>{" "}
      <br />
      <label className="TimeboxEditor__label">
        {" "}
        Jak Dlugo ?
        <input
          className="TimeboxEditor__input"
          disabled={!isEditable}
          value={totalTimeInMinutes}
          onChange={onTotalTimeInMinutesChange}
          type="number"
        />
      </label>{" "}
      <br />
      <div className="TimeboxEditor-wrapper">
        <button
          className="TimeboxEditor-wrapper__button"
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
