import { IsDate, IsInt } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateReturnDto {
  @ApiProperty()
  @IsInt()
  returnId: number;

  @ApiProperty()
  @IsInt()
  loanId: number;

  @ApiProperty()
  @IsDate()
  returnDate: Date;
}
