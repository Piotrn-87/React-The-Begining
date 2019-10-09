import React from "react";
import Clock from "./Clock";
import ProgressBar from "./ProgressBar";

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

export default CurrentTimebox;
