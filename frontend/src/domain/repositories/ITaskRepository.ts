import type { Task, TaskId, TaskStatus } from "../../domain/task";

export interface ITaskRepository {
  list(): Promise<Task[]>;
  create(input: { title: string; description?: string }): Promise<Task>;
  move(input: { id: TaskId; toStatus: TaskStatus }): Promise<Task>;
  update(input: {
    id: TaskId;
    patch: Partial<Pick<Task, "title" | "description" | "status">>;
  }): Promise<Task>;
  delete(id: TaskId): Promise<void>;
}
