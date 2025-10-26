import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.scss";

import App from "./App";

import { TasksProvider } from "./state/tasks/TasksContext";

const seed = [
  {
    id: "t1",
    title: "Design board layout",
    description: "Responsive (mobile-first)",
    status: "pending" as const,
  },
  {
    id: "t2",
    title: "Atoms ready",
    description: "Title, Button, Input",
    status: "in-progress" as const,
  },
  {
    id: "t3",
    title: "Docker dev",
    description: "Compose frontend only",
    status: "completed" as const,
  },
];

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <TasksProvider seed={seed}>
      <App />
    </TasksProvider>
  </React.StrictMode>
);
