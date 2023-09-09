import { ApiProperty } from '@nestjs/swagger';

export default class InfoEntity {
  @ApiProperty()
  totalRead: number;

  @ApiProperty()
  totalActiveLoans: number;

  @ApiProperty()
  totalFine: number;

  @ApiProperty()
  totalReserves: number;
}
