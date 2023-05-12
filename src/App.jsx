import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import JobsScreen from "./screens/JobsScreen";
import ExpandJobScreen from "./screens/ExpandJobScreen";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<JobsScreen />}></Route>
          <Route path="/:id" element={<ExpandJobScreen />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
