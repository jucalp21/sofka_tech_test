import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.scss";

const Root: React.FC = () => <h1>Kanban - Frontend ready</h1>;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
