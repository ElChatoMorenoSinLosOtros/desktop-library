import { IsEmail, IsInt, IsOptional, IsString } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/swagger';
import CreateClientDto from './create-client.dto';

export default class UpdateClientDto extends PartialType(CreateClientDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsInt()
  phoneNumber?: number;

  @IsOptional()
  @IsString()
  typeUser?: string;
}
