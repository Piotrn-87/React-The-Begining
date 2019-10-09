import React from "react";
import TimeboxEditor from "./TimeboxEditor";
import CurrentTimebox from "./CurrentTimebox";

import uuid from "uuid";

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
        <TimeboxEditor
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          isEditable={isEditable}
          onConfirm={this.handleConfirm}
          onTitleChange={this.handleTitleChange}
          onTotalTimeInMinutesChange={this.handleTotalTimeInMinutesChange}
        />{" "}
        <CurrentTimebox
          isEditable={isEditable}
          title={title}
          totalTimeInMinutes={totalTimeInMinutes}
          onEdit={this.handleEdit}
        />{" "}
      </React.Fragment>
    );
  }
}

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

class TimeboxList extends React.Component {
  state = {
    timeboxes: [
      {
        id: "a",
        title: "Uczę się list",
        totalTimeInMinutes: 25
      },
      {
        id: "b",
        title: "Uczę się formularzy",
        totalTimeInMinutes: 20
      },
      {
        id: "c",
        title: "Uczę się komponentów",
        totalTimeInMinutes: 15
      }
    ]
  };

  addTimebox = timebox => {
    this.setState(prevState => {
      const timeboxes = [...prevState.timeboxes, timebox];
      return {
        timeboxes
      };
    });
  };

  removeTimebox = indexToRemove => {
    this.setState(prevState => {
      const timeboxes = prevState.timeboxes.filter(
        (timebox, index) => index !== indexToRemove
      );
      return {
        timeboxes
      };
    });
  };

  updateTimebox = (indexToUpdate, updatedTimebox) => {
    this.setState(prevState => {
      const timeboxes = prevState.timeboxes.map((timebox, index) =>
        index === indexToUpdate ? updatedTimebox : timebox
      );
      return {
        timeboxes
      };
    });
  };

  handleCreate = createdTimebox => {
    this.addTimebox(createdTimebox);
  };

  render() {
    return (
      <>
        <TimeboxCreator onCreate={this.handleCreate} />{" "}
        {this.state.timeboxes.map((timebox, index) => (
          <Timebox
            key={timebox.id}
            title={timebox.title}
            totalTimeInMinutes={timebox.totalTimeInMinutes}
            onDelete={() => this.removeTimebox(index)}
            onEdit={() =>
              this.updateTimebox(index, {
                ...timebox,
                title: "WTF"
              })
            }
          />
        ))}{" "}
      </>
    );
  }
}

function Timebox({ title, totalTimeInMinutes, onDelete, onEdit }) {
  return (
    <div className="Timebox">
      <h3>
        {" "}
        {title} - {totalTimeInMinutes}
        min.{" "}
      </h3>{" "}
      <button onClick={onDelete}> Delete </button>{" "}
      <button onClick={onEdit}> Edit </button> <input />
    </div>
  );
}

export { EditableTimebox, TimeboxList };
