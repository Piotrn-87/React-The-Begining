import React from "react";
import CurrentTimebox from "./CurrentTimebox";
import TimeboxEditor from "./TimeboxEditor";

class EditableTimebox extends React.Component {
  state = {
    isEditable: true,
    title: "Ucze sie Reacta",
    totalTimeInMinutes: 20
  };

  handleTitleChange = event => {
    this.setState({
      title: event.target.value
    });
  };
  handleTotalTimeInMinutesChange = event => {
    this.setState({
      totalTimeInMinutes: event.target.value
    });
  };
  handleConfirm = event => {
    this.setState({
      isEditable: false
    });
  };
  handleEdit = evetn => {
    this.setState({
      isEditable: true
    });
  };

  render() {
    const { isEditable, title, totalTimeInMinutes } = this.state;
    return (
      <React.Fragment>
        <React.StrictMode>
          {isEditable ? (
            <TimeboxEditor
              title={title}
              totalTimeInMinutes={totalTimeInMinutes}
              isEditable={isEditable}
              onConfirm={this.handleConfirm}
              onTitleChange={this.handleTitleChange}
              onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
            />
          ) : (
            <CurrentTimebox
              isEditable={isEditable}
              title={title}
              totalTimeInMinutes={totalTimeInMinutes}
              onEdit={this.handleEdit}
            />
          )}
        </React.StrictMode>
      </React.Fragment>
    );
  }
}

export default EditableTimebox;
