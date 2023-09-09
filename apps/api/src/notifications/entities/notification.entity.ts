import { ApiProperty } from '@nestjs/swagger';

export default class NotificationEntity {
  @ApiProperty()
  notificationId!: number;

  @ApiProperty()
  notificationName!: string;

  @ApiProperty()
  notificationType!: string;

  @ApiProperty()
  notificationDate!: Date;

  @ApiProperty()
  notificationContent!: string;

  @ApiProperty()
  notificationRead: boolean;

  @ApiProperty()
  loanId?: number;

  @ApiProperty()
  materialId?: number;
}
