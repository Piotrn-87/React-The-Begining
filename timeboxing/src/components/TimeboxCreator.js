import React from "react";
import EditableTimebox from "./EditableTimebox";

import uuid from "uuid";

class TimeboxCreator extends React.Component {
  constructor(props) {
    super(props);
    this.titleInput = React.createRef();
    this.totalTimeInMinutesInput = React.createRef();
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.onCreate({
      id: uuid.v4(),
      title: "",
      totalTimeInMinutes: ""
    });
    this.titleInput.current.value = "";
    this.totalTimeInMinutesInput.current.value = "";
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="TimeboxCreator">
        <label>
          Co Robisz ?
          <input ref={this.titleInput} type="text" />
        </label>{" "}
        <br />
        <label>
          Jak Dlugo ?
          <input ref={this.totalTimeInMinutesInput} type="number" />
        </label>{" "}
        <br />
        <button> Add Timebox </button>{" "}
      </form>
    );
  }
}

export default EditableTimebox;
