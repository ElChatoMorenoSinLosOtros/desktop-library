import { ApiProperty } from '@nestjs/swagger';

export default class OfficeEntity {
  @ApiProperty()
  officeId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  updatedAt!: Date;
}
