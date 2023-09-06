import { ApiProperty } from '@nestjs/swagger';
import { Return } from '@prisma/client';

export default class ReturnEntity implements Return {
  @ApiProperty()
  returnId: number;

  @ApiProperty()
  loanId: number;

  @ApiProperty()
  returnDate: Date;
}
