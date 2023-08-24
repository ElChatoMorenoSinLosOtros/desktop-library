import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '@prisma/client';

export default class LoanEntity implements Loan {
  @ApiProperty()
  loanId: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  materialId: number;

  @ApiProperty()
  loanDate: Date;

  @ApiProperty()
  returnDate: Date;

  @ApiProperty()
  returned: boolean;
}
