import { IsEmail, IsInt, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CreateClientDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsInt()
  phoneNumber: number;

  @ApiProperty()
  @IsString()
  typeUser: string;
}

export default CreateClientDto;
