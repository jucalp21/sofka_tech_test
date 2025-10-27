import { ApiProperty } from "@nestjs/swagger";

export class CreateTaskDto {
  @ApiProperty() titulo!: string;
  @ApiProperty({ required: false }) descripcion?: string;
}
