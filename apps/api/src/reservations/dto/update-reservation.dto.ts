import { PartialType } from '@nestjs/swagger';
import CreateReservationDto from './create-reservation.dto';

export default class UpdateReservationDto extends PartialType(
  CreateReservationDto
) {}
