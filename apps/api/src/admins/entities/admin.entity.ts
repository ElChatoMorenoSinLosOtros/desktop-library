import LoanEntity from '@loans/entities/loan.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Admin } from '@prisma/client';
import AdminActions from './AdminActions';

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
  actions: AdminActions;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: () => [LoanEntity], isArray: true }) // Specify the type for loans array
  loans?: LoanEntity[];
}
