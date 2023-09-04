import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateOfficeDto {
  @ApiProperty()
  @IsString()
  name: string;
}
