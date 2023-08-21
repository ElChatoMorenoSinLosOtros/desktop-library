import { IsNotEmpty, IsOptional, IsString } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/swagger';
import CreateUserDto from './create-user.dto';

class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  gender: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  phone: string;
}

export default UpdateUserDto;
