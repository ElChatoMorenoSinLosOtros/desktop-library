import ClientEntity from '@clients/entities/client.entity';
import MaterialEntity from '@materials/entities/material.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Reserve } from '@prisma/client';

export default class ReserveEntity implements Reserve {
  @ApiProperty()
  reserveId: number;

  @ApiProperty()
  clientId: number;

  @ApiProperty()
  materialId: number;

  @ApiProperty()
  reserveDate: Date;

  @ApiProperty()
  executeDate: Date;

  @ApiProperty()
  returnDate: Date;

  @ApiProperty()
  executed: boolean;

  @ApiProperty({ type: () => ClientEntity })
  client: ClientEntity;

  @ApiProperty({ type: () => MaterialEntity })
  material: MaterialEntity;
}
