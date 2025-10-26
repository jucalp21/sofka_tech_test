import React from "react";
import Title from "../../atoms/Title/Title";
import TaskCreateForm from "../../molecules/TaskCreateForm/TaskCreateForm";
import styles from "./Column.module.scss";
import type { Task, TaskStatus } from "../../../domain/task";

interface ColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onCreate?: (title: string, description?: string) => void;
  onMove?: (taskId: string, toStatus: TaskStatus) => void;
}

const Column: React.FC<ColumnProps> = ({ status, tasks, onCreate, onMove }) => {
  const modifier =
    status === "pending"
      ? styles["column--pending"]
      : status === "in-progress"
      ? styles["column--progress"]
      : styles["column--done"];

  const labelMap: Record<TaskStatus, string> = {
    pending: "Pending",
    "in-progress": "In Progress",
    completed: "Completed",
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    if (taskId && onMove) onMove(taskId, status);
  };

  const onDragStart =
    (id: string): React.DragEventHandler<HTMLElement> =>
    (e) => {
      e.dataTransfer.setData("text/plain", id);
      e.dataTransfer.effectAllowed = "move";
    };

  return (
    <section className={`${styles.column} ${modifier}`}>
      <header className={styles.column__header}>
        <Title tag="h3" size="md">
          {labelMap[status]}
        </Title>
        <span className={styles.column__count}>{tasks.length}</span>
      </header>

      {status === "pending" && onCreate && (
        <div className={styles.column__form}>
          <TaskCreateForm onCreate={onCreate} />
        </div>
      )}

      <div
        className={styles.column__stack}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        role="list"
        aria-label={`${labelMap[status]} drop zone`}
      >
        {tasks.length === 0 ? (
          <div className={styles.column__empty}>Drop tasks here</div>
        ) : (
          tasks.map((t) => (
            <article
              key={t.id}
              className={styles.column__card}
              draggable
              onDragStart={onDragStart(t.id)}
              aria-grabbed="true"
              role="listitem"
            >
              <h4 className={styles.column__cardTitle}>{t.title}</h4>
              {t.description && (
                <p className={styles.column__cardDesc}>{t.description}</p>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default Column;
