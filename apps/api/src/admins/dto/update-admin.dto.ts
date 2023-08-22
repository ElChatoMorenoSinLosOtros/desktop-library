import { PartialType } from '@nestjs/swagger';
import CreateAdminDto from './create-admin.dto';

export default class UpdateAdminDto extends PartialType(CreateAdminDto) {}
