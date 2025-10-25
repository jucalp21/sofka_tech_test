import React from "react";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <main className={styles.app}>
      <h1 className={styles.app__title}>Kanban</h1>
    </main>
  );
};

export default App;
