import { PartialType } from '@nestjs/swagger';
import CreateClientDto from './create-client.dto';

export default class UpdateClientDto extends PartialType(CreateClientDto) {}
