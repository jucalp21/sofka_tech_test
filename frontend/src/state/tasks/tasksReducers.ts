import type { Task, TaskId, TaskStatus } from "../../domain/task";

export interface TasksState {
  items: Record<TaskId, Task>;
}

export type TasksAction =
  | { type: "SET_ALL"; payload: Task[] }
  | { type: "ADD"; payload: Task }
  | { type: "UPDATE"; payload: Task }
  | { type: "REMOVE"; payload: { id: TaskId } }
  | { type: "MOVE"; payload: { id: TaskId; to: TaskStatus } };

export const initialTasksState: TasksState = {
  items: {},
};

export function tasksReducer(
  state: TasksState,
  action: TasksAction
): TasksState {
  switch (action.type) {
    case "SET_ALL": {
      const map: Record<TaskId, Task> = {};
      for (const t of action.payload) map[t.id] = t;
      return { items: map };
    }

    case "ADD": {
      const t = action.payload;
      return { items: { ...state.items, [t.id]: t } };
    }

    case "UPDATE": {
      const t = action.payload;
      if (!state.items[t.id]) return state;
      return { items: { ...state.items, [t.id]: t } };
    }

    case "REMOVE": {
      const copy = { ...state.items };
      delete copy[action.payload.id];
      return { items: copy };
    }

    case "MOVE": {
      const { id, to } = action.payload;
      const current = state.items[id];
      if (!current) return state;
      const moved: Task = { ...current, status: to };
      return { items: { ...state.items, [id]: moved } };
    }

    default:
      return state;
  }
}

export const selectAll = (s: TasksState): Task[] => Object.values(s.items);
export const selectByStatus = (s: TasksState, status: TaskStatus): Task[] =>
  Object.values(s.items).filter((t) => t.status === status);
