import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import Header from "./Header";
import Error from "./Error";

function App() {
  return (
    <div className="App">
      <Error message="Coś nie dziala poprawnie">
        <Header />
        <TimeboxList />
        <EditableTimebox />
      </Error>
    </div>
  );
}

export default App;
