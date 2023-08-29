import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsDate } from '@nestjs/class-validator';

export default class CreateReservationDto {
  @ApiProperty()
  @IsInt()
  clientId: number;

  @ApiProperty()
  @IsInt()
  materialId: number;

  @ApiProperty()
  @IsDate()
  initialDate?: Date;

  @ApiProperty()
  @IsDate()
  dueDate?: Date;
}
