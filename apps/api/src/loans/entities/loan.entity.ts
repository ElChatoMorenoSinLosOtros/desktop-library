import { ApiProperty } from '@nestjs/swagger';
import { Loan } from '@prisma/client';
import AdminEntity from 'src/admins/entities/admin.entity';
import ClientEntity from 'src/clients/entities/client.entity';
import MaterialEntity from 'src/materials/entities/material.entity';

export default class LoanEntity implements Loan {
  @ApiProperty()
  loanId: number;

  @ApiProperty()
  adminId: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  materialId: number;

  @ApiProperty()
  loanDate: Date;

  @ApiProperty()
  returnDate: Date | null; // Make sure to match the type with the Prisma model

  @ApiProperty()
  returned: boolean;

  @ApiProperty({ type: () => AdminEntity }) // Specify the type of the related entity
  admin: AdminEntity;

  @ApiProperty({ type: () => ClientEntity }) // Specify the type of the related entity
  client: ClientEntity;

  @ApiProperty({ type: () => MaterialEntity }) // Specify the type of the related entity
  material: MaterialEntity;
}
