import ClientEntity from '@clients/entities/client.entity';
import MaterialEntity from '@materials/entities/material.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Reserve } from '@prisma/client';

export default class ReserveEntity implements Reserve {
  @ApiProperty()
  reserveId: number;

  @ApiProperty()
  loanId: number;

  @ApiProperty()
  adminId: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  materialId: number;

  @ApiProperty()
  checkDate: Date;

  @ApiProperty()
  returnDate: Date | null;

  @ApiProperty()
  executed: boolean;

  @ApiProperty({ type: () => ClientEntity })
  client: ClientEntity;

  @ApiProperty({ type: () => MaterialEntity })
  material: MaterialEntity;
}
