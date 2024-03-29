import React from "react";
import TimeboxCreator from "./TimeboxCreator";
import Timebox from "./Timebox";
import Error from "./Error";

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
    throw new Error("Nie udalo sie utworzyc timeboxa");
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
    try {
      this.addTimebox(createdTimebox);
    } catch (error) {
      console.log("Bląd przy tworzeniu Timeboxa ", error);
    }
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

export default TimeboxList;
