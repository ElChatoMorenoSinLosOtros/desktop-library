import { Module } from '@nestjs/common';
import LoginController from './controller';
import TokenVerifyService from './service';

@Module({
  controllers: [LoginController],
  providers: [TokenVerifyService]
})
export default class LoginModule {}
