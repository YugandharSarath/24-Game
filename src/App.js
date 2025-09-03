import React, { useEffect } from "react";
import { init, dealNewCards } from "./twentyFourGame";
import "./styles.css";

function App() {
  useEffect(() => {
    init();
    dealNewCards();
  }, []);

  return (
    <main className="app">
      <div id="cards"></div>
      <div>
        <span id="expression"></span>
        <span id="result"></span>
      </div>
      <ul id="history"></ul>
    </main>
  );
}

export default App;
