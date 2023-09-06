import { PartialType } from '@nestjs/swagger';
import CreateReturnDto from './create-return.dto';

class UpdateReturnDto extends PartialType(CreateReturnDto) {}

export default UpdateReturnDto;
