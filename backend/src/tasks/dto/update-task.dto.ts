import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateTaskDto {
  @ApiPropertyOptional() titulo?: string;
  @ApiPropertyOptional() descripcion?: string;
  @ApiPropertyOptional({ enum: ["Pendiente", "EnProgreso", "Completada"] })
  estado?: "Pendiente" | "EnProgreso" | "Completada";
}
