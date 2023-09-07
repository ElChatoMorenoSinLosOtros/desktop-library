import { PartialType } from '@nestjs/swagger';
import CreateNotificationDto from './create-notification.dto';

export default class UpdateNotificationDto extends PartialType(
  CreateNotificationDto
) {}
