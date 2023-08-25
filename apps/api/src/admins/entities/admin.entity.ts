import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';
import LoanEntity from 'src/loans/entities/loan.entity';

export default class AdminEntity implements Admin {
  @ApiProperty()
  adminId: number;

  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  role: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [LoanEntity], isArray: true }) // Specify the type for loans array
  loans?: LoanEntity[];
}
