export type TaskId = string;
export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: TaskId;
  title: string;
  description?: string;
  status: TaskStatus;
}

export const STATUSES: TaskStatus[] = ["pending", "in-progress", "completed"];
