import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useCallback,
} from "react";
import type { Task, TaskId, TaskStatus } from "../../domain/task";
import { HttpTaskRepository } from "../../infra/repositories/HttpTaskRepository";

type State = { tasks: Task[] };

type Action =
  | { type: "ADD"; task: Task }
  | { type: "MOVE"; id: TaskId; toStatus: TaskStatus }
  | { type: "SET"; tasks: Task[] }
  | { type: "REMOVE"; id: TaskId }
  | { type: "UPDATE"; id: TaskId; patch: Partial<Task> };

const initial: State = { tasks: [] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET":
      return { tasks: action.tasks };
    case "ADD":
      return { tasks: [action.task, ...state.tasks] };
    case "MOVE":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, status: action.toStatus } : t
        ),
      };
    case "UPDATE":
      return {
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, ...action.patch } : t
        ),
      };
    case "REMOVE":
      return { tasks: state.tasks.filter((t) => t.id !== action.id) };
    default:
      return state;
  }
}

interface TasksService {
  list: () => Promise<void>;
  add: (task: Task) => Promise<void>;
  move: (id: TaskId, toStatus: TaskStatus) => Promise<void>;
  getByStatus: (status: TaskStatus) => Task[];
  state: State;
}

const Ctx = createContext<TasksService | null>(null);

export const TasksProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initial);
  const repo = useMemo(() => new HttpTaskRepository(), []);

  const list = async () => {
    const tasks = await repo.list();
    dispatch({ type: "SET", tasks });
  };

  const add = async (task: Task) => {
    dispatch({ type: "ADD", task });
    try {
      const created = await repo.create({
        title: task.title,
        description: task.description,
      });
      dispatch({ type: "UPDATE", id: task.id, patch: created });
    } catch (e) {
      dispatch({ type: "REMOVE", id: task.id });
      throw e;
    }
  };

  const move = async (id: TaskId, toStatus: TaskStatus) => {
    const prev = state.tasks.find((t) => t.id === id);
    if (!prev) return;

    dispatch({ type: "MOVE", id, toStatus });
    try {
      const updated = await repo.move({ id, toStatus });
      dispatch({ type: "UPDATE", id, patch: updated });
    } catch (e) {
      dispatch({ type: "MOVE", id, toStatus: prev.status });
      throw e;
    }
  };

  const getByStatus = useCallback(
    (status: TaskStatus) => state.tasks.filter((t) => t.status === status),
    [state.tasks]
  );

  const service: TasksService = { list, add, move, getByStatus, state };

  return <Ctx.Provider value={service}>{children}</Ctx.Provider>;
};

export const useTasks = (): TasksService => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
};
