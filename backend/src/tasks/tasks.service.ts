import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TaskStatus } from "@prisma/client";
import { TasksRepository } from "./tasks.repository";
import { TaskMapper, EstadoES } from "./task.mapper";

@Injectable()
export class TasksService {
  constructor(private readonly repo: TasksRepository) {}

  async list() {
    const rows = await this.repo.findAll();
    return TaskMapper.listToSpanish(rows);
  }

  async get(id: string) {
    const row = await this.repo.findById(id);
    if (!row) throw new NotFoundException("Tarea no encontrada");
    return TaskMapper.toSpanish(row);
  }

  async create(input: { titulo: string; descripcion?: string }) {
    const created = await this.repo.create({
      title: input.titulo,
      description: input.descripcion,
    });
    return TaskMapper.toSpanish(created);
  }

  async update(
    id: string,
    patch: Partial<{ titulo: string; descripcion: string; estado: EstadoES }>
  ) {
    const current = await this.repo.findById(id);
    if (!current) throw new NotFoundException("Tarea no encontrada");

    const data: any = {};
    if (patch.titulo !== undefined) data.title = patch.titulo;
    if (patch.descripcion !== undefined) data.description = patch.descripcion;
    if (patch.estado) {
      const to = TaskMapper.estadoToEN(patch.estado);
      this.ensureValidTransition(current.status, to);
      data.status = to;
    }

    const updated = await this.repo.update(id, data);
    return TaskMapper.toSpanish(updated);
  }

  async delete(id: string) {
    await this.repo.delete(id);
    return { message: "Tarea eliminada" };
  }

  private ensureValidTransition(from: TaskStatus, to: TaskStatus) {
    const order: TaskStatus[] = ["pending", "in_progress", "completed"];
    const iFrom = order.indexOf(from);
    const iTo = order.indexOf(to);
    if (iTo < iFrom)
      throw new BadRequestException(`Invalid transition: ${from} → ${to}`);
  }
}
