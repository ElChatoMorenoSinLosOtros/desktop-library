import ClientEntity from '@/clients/entities/client.entity';
import LoanEntity from '@/loans/entities/loan.entity';
import { ApiProperty } from '@nestjs/swagger';

export default class FineEntity {
  @ApiProperty()
  fineId: number;

  @ApiProperty()
  debt: number;

  @ApiProperty()
  createDate: Date;

  @ApiProperty()
  payeed: boolean;

  @ApiProperty({ type: () => LoanEntity })
  loan: LoanEntity;

  @ApiProperty({ type: () => ClientEntity })
  client: ClientEntity;
}
