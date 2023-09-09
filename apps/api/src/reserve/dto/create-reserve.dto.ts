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
  reserveDate?: Date;

  @ApiProperty()
  @IsDate()
  executeDate: Date;

  @ApiProperty()
  @IsDate()
  returnDate: Date;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  executed?: boolean;
}
