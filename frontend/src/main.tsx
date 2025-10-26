import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.scss";

import App from "./App";

import { TasksProvider } from "./state/tasks/TasksContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>
);
