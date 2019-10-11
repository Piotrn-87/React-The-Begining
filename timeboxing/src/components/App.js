import React from "react";
import TimeboxList from "./TimeboxList";
import EditableTimebox from "./EditableTimebox";
import Header from "./Header";

function App() {
  return (
    <div className="App">
      <Header />
      <TimeboxList />
      <EditableTimebox />
    </div>
  );
}

export default App;
