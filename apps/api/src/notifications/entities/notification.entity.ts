import { ApiProperty } from '@nestjs/swagger';

export default class NotificationEntity {
  @ApiProperty()
  notificationId!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  notificationName!: string;

  @ApiProperty()
  notificationType!: string;

  @ApiProperty()
  notificationContent!: string;

  @ApiProperty()
  createdAt!: Date;
}
