import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import type { Task } from "@prisma/client";

@Injectable()
export class TasksRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(): Promise<Task[]> {
    return this.prisma.task.findMany({ orderBy: { createdAt: "desc" } });
  }
  findById(id: string): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }
  create(data: { title: string; description?: string }): Promise<Task> {
    return this.prisma.task.create({ data });
  }
  update(
    id: string,
    data: Partial<Pick<Task, "title" | "description" | "status">>
  ): Promise<Task> {
    return this.prisma.task.update({ where: { id }, data });
  }
  delete(id: string): Promise<void> {
    return this.prisma.task.delete({ where: { id } }).then(() => undefined);
  }
}
