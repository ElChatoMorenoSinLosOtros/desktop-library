import { PartialType } from '@nestjs/swagger';
import CreateOfficeDto from './create-office.dto';

export default class UpdateOfficeDto extends PartialType(CreateOfficeDto) {}
