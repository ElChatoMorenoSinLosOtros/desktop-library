import { ApiProperty } from '@nestjs/swagger';
import { Client } from '@prisma/client';
import LoanEntity from 'src/loans/entities/loan.entity';

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

  @ApiProperty({ type: () => [LoanEntity], isArray: true }) // Specify the type for loans array
  loans?: LoanEntity[];
}
