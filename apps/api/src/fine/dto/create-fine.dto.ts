import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDecimal, IsInt } from 'class-validator';

export default class CreateFineDto {
  @ApiProperty()
  @IsDecimal()
  debt: number;

  @ApiProperty()
  @IsBoolean()
  paid: boolean;

  @ApiProperty()
  @IsInt()
  loanId: number;

  @ApiProperty()
  @IsInt()
  clientId: number;
}
