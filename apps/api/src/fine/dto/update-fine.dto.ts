import { PartialType } from '@nestjs/swagger';
import CreateFineDto from './create-fine.dto';

export default class UpdateFineDto extends PartialType(CreateFineDto) {}
