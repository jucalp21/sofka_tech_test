import React from "react";
import styles from "./BoardLayout.module.scss";

interface BoardLayoutProps {
  children: React.ReactNode;
}

const BoardLayout: React.FC<BoardLayoutProps> = ({ children }) => {
  return <section className={styles.board}>{children}</section>;
};

export default BoardLayout;
