import { IsEmail, IsInt, IsString } from '@nestjs/class-validator';

class CreateClientDto {
  @IsString()
  name: string;

  @IsString()
  lastName: string;

  @IsString()
  address: string;

  @IsEmail()
  email: string;

  @IsInt()
  phoneNumber: number;

  @IsString()
  typeUser: string;
}

export default CreateClientDto;
