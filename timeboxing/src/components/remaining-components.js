import React from "react";
import uuid from "uuid";

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

function Clock({ className = "", minutes, seconds }) {
  return (
    <h2 className={"clock " + className}>
      {" "}
      Time to left: {minutes < 10 ? "0" + minutes : minutes}:{" "}
      {seconds < 10 ? "0" + seconds : seconds}{" "}
    </h2>
  );
}

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

class CurrentTimebox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimesInSeconds: 0
    };
    this.handleStart = this.handleStart.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }

  handleStart(event) {
    this.setState({
      isRunning: true
    });
    this.startTimer();
  }

  handleStop(event) {
    this.setState({
      isRunning: false,
      isPaused: false,
      pausesCount: 0,
      elapsedTimesInSeconds: 0
    });
    this.stopTimer();
  }

  startTimer() {
    this.intervalId = window.setInterval(() => {
      this.setState(prevState => ({
        elapsedTimesInSeconds: prevState.elapsedTimesInSeconds + 0.1
      }));
    }, 100);
  }

  stopTimer() {
    window.clearInterval(this.intervalId);
  }

  togglePause() {
    this.setState(function(prevState) {
      const isPaused = !prevState.isPaused;
      console.log(isPaused);
      if (isPaused) {
        this.stopTimer();
      } else {
        this.startTimer();
      }
      return {
        isPaused,
        pausesCount: isPaused
          ? prevState.pausesCount + 10
          : prevState.pausesCount - 5
      };
    });
  }

  render() {
    const {
      isPaused,
      isRunning,
      pausesCount,
      elapsedTimesInSeconds
    } = this.state;
    const { title, totalTimeInMinutes, isEditable, onEdit } = this.props;
    const totalTimeInSeconds = totalTimeInMinutes * 60;
    const timeLeftInSeconds = totalTimeInSeconds - elapsedTimesInSeconds;
    const minutesLeft = Math.floor(timeLeftInSeconds / 60);
    const secondsLeft = Math.floor(timeLeftInSeconds % 60);
    const progressInPercent =
      (elapsedTimesInSeconds / totalTimeInSeconds) * 100;
    return (
      <div className={`CurrentTimeBox ${isEditable ? "inactive" : ""}`}>
        <h1 className="TimeBoxClock"> {title} </h1>{" "}
        <Clock
          minutes={minutesLeft}
          seconds={secondsLeft}
          className={isPaused ? "inactive" : ""}
        />{" "}
        <ProgressBar
          percent={progressInPercent}
          className={isPaused ? "inactive" : ""}
        />{" "}
        <button
          className="TimeBox__button"
          onClick={onEdit}
          disabled={isEditable}
        >
          Edit{" "}
        </button>{" "}
        <button
          className="TimeBox__button"
          onClick={this.handleStart}
          disabled={isRunning}
        >
          Start{" "}
        </button>{" "}
        <button
          className="TimeBox__button"
          onClick={this.handleStop}
          disabled={!isRunning}
        >
          Stop{" "}
        </button>{" "}
        <button
          className="TimeBox__button"
          onClick={this.togglePause}
          disabled={!isRunning}
        >
          {isPaused ? "Continue" : "Pause"}{" "}
        </button>{" "}
        <br /> <br />
        Breaks {pausesCount}{" "}
      </div>
    );
  }
}

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
