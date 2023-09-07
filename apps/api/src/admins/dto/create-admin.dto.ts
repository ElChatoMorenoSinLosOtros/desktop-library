import { IsEmail, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsJSON } from 'class-validator';
import AdminActions from '../entities/AdminActions';

export default class CreateAdminDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  role: string;

  @ApiProperty()
  @IsJSON()
  actions: AdminActions;
}
