import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export default class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  notificationName: string;

  @ApiProperty()
  @IsString()
  notificationType: string;

  @ApiProperty()
  @IsString()
  notificationContent: string;
}
