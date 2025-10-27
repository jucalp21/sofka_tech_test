import { Task, TaskStatus } from "@prisma/client";

export type EstadoES = "Pendiente" | "EnProgreso" | "Completada";

const toES: Record<TaskStatus, EstadoES> = {
  pending: "Pendiente",
  in_progress: "EnProgreso",
  completed: "Completada",
};

const toEN: Record<EstadoES, TaskStatus> = {
  Pendiente: "pending",
  EnProgreso: "in_progress",
  Completada: "completed",
};

export class TaskMapper {
  static toSpanish(task: Task) {
    const { title, description, status, ...rest } = task;
    return {
      ...rest,
      titulo: title,
      descripcion: description ?? null,
      estado: toES[status],
    };
  }
  static listToSpanish(tasks: Task[]) {
    return tasks.map(TaskMapper.toSpanish);
  }
  static estadoToEN(estado: EstadoES) {
    return toEN[estado];
  }
}
