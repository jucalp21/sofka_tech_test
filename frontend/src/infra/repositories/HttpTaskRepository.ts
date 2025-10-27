import type { ITaskRepository } from "../../domain/repositories/ITaskRepository";
import type { Task, TaskId, TaskStatus } from "../../domain/task";
import { ApiClient } from "../http/ApiClient";
import type { ApiTask } from "../adapters/TaskApiAdapter";
import { TaskApiAdapter } from "../adapters/TaskApiAdapter";

export class HttpTaskRepository implements ITaskRepository {
  private readonly http;
  constructor() {
    this.http = new ApiClient();
  }

  async list(): Promise<Task[]> {
    const res = await this.http.request<ApiTask[]>({
      path: "/tasks",
      method: "GET",
    });
    if (!res.ok || !res.data)
      throw new Error(res.problem?.detail ?? "Failed to fetch tasks");
    return res.data.map(TaskApiAdapter.toDomain);
  }

  async create(input: { title: string; description?: string }): Promise<Task> {
    const body = TaskApiAdapter.toApiCreate(input);
    const res = await this.http.request<ApiTask, typeof body>({
      path: "/tasks",
      method: "POST",
      body,
    });
    if (!res.ok || !res.data)
      throw new Error(res.problem?.detail ?? "Create failed");
    return TaskApiAdapter.toDomain(res.data);
  }

  async move(input: { id: TaskId; toStatus: TaskStatus }): Promise<Task> {
    const res = await this.http.request<ApiTask, { estado: ApiTask["estado"] }>(
      {
        path: `/tasks/${encodeURIComponent(input.id)}`,
        method: "PATCH",
        body: { estado: TaskApiAdapter.toApiEstado(input.toStatus) },
      }
    );
    if (!res.ok || !res.data)
      throw new Error(res.problem?.detail ?? "Move failed");
    return TaskApiAdapter.toDomain(res.data);
  }

  async update(input: {
    id: TaskId;
    patch: Partial<Pick<Task, "title" | "description" | "status">>;
  }): Promise<Task> {
    const body = TaskApiAdapter.toApiPatch(input.patch);
    const res = await this.http.request<ApiTask, typeof body>({
      path: `/tasks/${encodeURIComponent(input.id)}`,
      method: "PATCH",
      body,
    });
    if (!res.ok || !res.data)
      throw new Error(res.problem?.detail ?? "Update failed");
    return TaskApiAdapter.toDomain(res.data);
  }

  async delete(id: TaskId): Promise<void> {
    const res = await this.http.request<void>({
      path: `/tasks/${encodeURIComponent(id)}`,
      method: "DELETE",
    });
    if (!res.ok) throw new Error(res.problem?.detail ?? "Delete failed");
  }
}
