import { PartialType } from '@nestjs/swagger';
import CreateReserveDto from './create-reserve.dto';

export default class UpdateReserveDto extends PartialType(CreateReserveDto) {}
