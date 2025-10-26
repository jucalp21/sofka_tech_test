import type { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import type { Task, TaskId, TaskStatus } from "../../domain/task";
import { ApiClient } from "../http/ApiClient";

export class HttpTaskRepository implements ITaskRepository {
  private readonly http;
  constructor(http = new ApiClient()) {
    this.http = http;
  }

  async list(): Promise<Task[]> {
    const res = await this.http.request<Task[]>({
      path: "/tasks",
      method: "GET",
    });
    if (!res.ok) throw new Error(res.problem?.title ?? "Failed to fetch tasks");
    return res.data ?? [];
  }

  async create(input: { title: string; description?: string }): Promise<Task> {
    const res = await this.http.request<Task, typeof input>({
      path: "/tasks",
      method: "POST",
      body: input,
    });
    if (!res.ok)
      throw new Error(
        res.problem?.detail ?? res.problem?.title ?? "Create failed"
      );
    return res.data!;
  }

  async move(input: { id: TaskId; toStatus: TaskStatus }): Promise<Task> {
    const res = await this.http.request<Task, { status: TaskStatus }>({
      path: `/tasks/${encodeURIComponent(input.id)}/status`,
      method: "PATCH",
      body: { status: input.toStatus },
    });
    if (!res.ok)
      throw new Error(
        res.problem?.detail ?? res.problem?.title ?? "Move failed"
      );
    return res.data!;
  }

  async update(input: {
    id: TaskId;
    patch: Partial<Pick<Task, "title" | "description" | "status">>;
  }): Promise<Task> {
    const res = await this.http.request<Task, (typeof input)["patch"]>({
      path: `/tasks/${encodeURIComponent(input.id)}`,
      method: "PATCH",
      body: input.patch,
    });
    if (!res.ok)
      throw new Error(
        res.problem?.detail ?? res.problem?.title ?? "Update failed"
      );
    return res.data!;
  }

  async delete(id: TaskId): Promise<void> {
    const res = await this.http.request<void>({
      path: `/tasks/${encodeURIComponent(id)}`,
      method: "DELETE",
    });
    if (!res.ok)
      throw new Error(
        res.problem?.detail ?? res.problem?.title ?? "Delete failed"
      );
  }
}
