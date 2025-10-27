import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@ApiTags("tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly service: TasksService) {}

  @Get() list() {
    return this.service.list();
  }
  @Get(":id") get(@Param("id") id: string) {
    return this.service.get(id);
  }
  @Post() create(@Body() body: CreateTaskDto) {
    return this.service.create(body);
  }
  @Patch(":id") update(@Param("id") id: string, @Body() body: UpdateTaskDto) {
    return this.service.update(id, body);
  }
  @Delete(":id") del(@Param("id") id: string) {
    return this.service.delete(id);
  }
}
