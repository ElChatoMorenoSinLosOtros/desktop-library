import { ApiProperty } from '@nestjs/swagger';

export default class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
