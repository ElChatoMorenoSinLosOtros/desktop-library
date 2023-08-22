import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;
}
