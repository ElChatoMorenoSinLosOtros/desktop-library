import { ApiProperty } from "@nestjs/swagger";
import { IsDate } from '@nestjs/class-validator';

export default class CreateReservationDto {
  @ApiProperty()
  @IsDate()
  orderDate?: Date;

  @ApiProperty()
  @IsDate()
  dueDate?: Date;
}
