import { PartialType } from '@nestjs/swagger';
import CreateMaterialDto from './create-material.dto';

class UpdateMaterialDto extends PartialType(CreateMaterialDto) {}

export default UpdateMaterialDto;
