import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsInt, IsOptional } from 'class-validator';

export default class CreateLoanDto {
  @ApiProperty()
  @IsInt()
  clientId: number;

  @ApiProperty()
  @IsInt()
  materialId: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  loanDate?: Date;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  returnDate?: Date | null;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  returned?: boolean;

  @ApiProperty()
  @IsInt()
  adminID: number;
}
