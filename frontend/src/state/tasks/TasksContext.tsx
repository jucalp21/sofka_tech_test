import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import type { Task, TaskId, TaskStatus } from "../../domain/task";
import {
  initialTasksState,
  tasksReducer,
  selectAll,
  selectByStatus,
} from "./tasksReducers";

interface TasksService {
  getAll(): Task[];
  getByStatus(status: TaskStatus): Task[];
  add(task: Task): void;
  update(task: Task): void;
  remove(id: TaskId): void;
  move(id: TaskId, to: TaskStatus): void;
}

const TasksContext = createContext<TasksService | null>(null);

type ProviderProps = React.PropsWithChildren<{
  seed?: Task[];
}>;

export const TasksProvider: React.FC<ProviderProps> = ({ seed, children }) => {
  const [state, dispatch] = useReducer(tasksReducer, initialTasksState);

  useEffect(() => {
    if (seed && seed.length) {
      dispatch({ type: "SET_ALL", payload: seed });
    }
  }, [seed]);

  const service = useMemo<TasksService>(
    () => ({
      getAll: () => selectAll(state),
      getByStatus: (status) => selectByStatus(state, status),
      add: (task) => dispatch({ type: "ADD", payload: task }),
      update: (task) => dispatch({ type: "UPDATE", payload: task }),
      remove: (id) => dispatch({ type: "REMOVE", payload: { id } }),
      move: (id, to) => dispatch({ type: "MOVE", payload: { id, to } }),
    }),
    [state]
  );

  return (
    <TasksContext.Provider value={service}>{children}</TasksContext.Provider>
  );
};

export function useTasks(): TasksService {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks debe usarse dentro de <TasksProvider>");
  return ctx;
}
