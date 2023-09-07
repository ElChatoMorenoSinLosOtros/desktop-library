import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsOptional } from 'class-validator';

export default class CreateReserveDto {
  @ApiProperty()
  @IsInt()
  clientId: number;

  @ApiProperty()
  @IsInt()
  materialId: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  checkDate?: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  returnDate?: Date | null;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  executed?: boolean;

  @ApiProperty()
  @IsInt()
  adminID: number;
}
