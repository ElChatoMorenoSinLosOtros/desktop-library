import LoanEntity from '@loans/entities/loan.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';

export default class ClientEntity implements Client {
  @ApiProperty()
  clientId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phoneNumber: number;

  @ApiProperty()
  typeUser: string;

  @ApiProperty({ type: () => [LoanEntity], isArray: true })
  loans?: LoanEntity[];
}
