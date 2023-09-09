import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';

export default class CreateNotificationDto {
  @ApiProperty()
  @IsString()
  notificationName: string;

  @ApiProperty()
  @IsString()
  notificationType: string;

  @ApiProperty()
  @IsString()
  notificationContent: string;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  loanId?: number;

  @ApiProperty()
  @IsInt()
  @IsOptional()
  materialId?: number;
}
