import React, { useEffect } from "react";
import BoardLayout from "../templates/BoardLayout/BoardLayout";
import Column from "../organisms/Column/Column";
import { useTasks } from "../../state/tasks/TasksContext";
import type { TaskStatus } from "../../domain/task";

const KanbanBoard: React.FC = () => {
  const tasksService = useTasks();

  useEffect(() => {
    tasksService.list().catch((e) => {
      console.error("[KanbanBoard] list() failed", e);
    });
  }, []);

  const handleCreate = (title: string, description?: string) => {
    const id = globalThis.crypto?.randomUUID?.() ?? Date.now().toString();
    tasksService.add({ id, title, description, status: "pending" });
  };

  const handleMove = (taskId: string, toStatus: TaskStatus) => {
    tasksService.move(taskId, toStatus).catch((e) => {
      console.error("[KanbanBoard] move() failed", e);
    });
  };

  return (
    <main className="container">
      <h1 style={{ marginBottom: 16 }}>Kanban</h1>

      <BoardLayout>
        <Column
          status="pending"
          tasks={tasksService.getByStatus("pending")}
          onCreate={handleCreate}
          onMove={handleMove}
        />
        <Column
          status="in-progress"
          tasks={tasksService.getByStatus("in-progress")}
          onMove={handleMove}
        />
        <Column
          status="completed"
          tasks={tasksService.getByStatus("completed")}
          onMove={handleMove}
        />
      </BoardLayout>
    </main>
  );
};

export default KanbanBoard;
