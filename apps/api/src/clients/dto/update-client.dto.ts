import { IsEmail, IsInt, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import CreateClientDto from './create-client.dto';

export default class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional()
  @IsString()
  @ApiProperty()
  name?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  lastName?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address?: string;

  @IsOptional()
  @IsEmail()
  @ApiProperty()
  email?: string;

  @IsOptional()
  @IsInt()
  @ApiProperty()
  phoneNumber?: number;

  @IsOptional()
  @IsString()
  @ApiProperty()
  typeUser?: string;
}
